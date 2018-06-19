import sys
import json
import csv
import shapely.wkb
import shapely.geometry
import shapely.ops
import codecs
import os
import inspect
import copy
from osgeo import ogr
from osgeo import osr
from booleano.parser import Grammar, EvaluableParseManager, SymbolTable, Bind
from booleano.operations import Variable


class Map:
  def __init__(self, name, language):
    self.paths = {}
    self.name = name
    self.language = language
    self.width = 0
    self.height = 0
    self.bbox = []

  def addPath(self, path, code, name):
    self.paths[code] = {"path": path, "name": name}

  def getJSCode(self):
    map = {"paths": self.paths, "width": self.width, "height": self.height, "insets": self.insets, "projection": self.projection}
    return "jQuery.fn.vectorMap('addMap', '"+self.name+"_"+self.projection['type']+"',"+json.dumps(map)+');'


class Converter:
  def __init__(self, config):
    args = {
      'buffer_distance': -0.4,
      'simplify_tolerance': 0.2,
      'longitude0': 0,
      'projection': 'mill',
      'name': 'world',
      'width': 900,
      'left': 0,
      'top': 0,
      'language': 'en',
      'precision': 2,
      'insets': []
    }
    args.update(config)

    self.config = args

    self.map = Map(args['name'], args.get('language'))

    if args.get('sources'):
      self.sources = args['sources']
    else:
      self.sources = [{
        'input_file': args.get('input_file'),
        'where': args.get('where'),
        'name_field': args.get('name_field'),
        'code_field': args.get('code_field'),
        'input_file_encoding': args.get('input_file_encoding')
      }]

    default_source = {
      'where': '',
      'name_field': 0,
      'code_field': 1,
      'input_file_encoding': 'iso-8859-1'
    }

    for index in range(len(self.sources)):
      for key in default_source:
        if self.sources[index].get(key) is None:
          self.sources[index][key] = default_source[key]

    self.features = {}
    self.width = args.get('width')
    self.left = args.get('left')
    self.top = args.get('top')
    self.minimal_area = args.get('minimal_area')
    self.longitude0 = float(args.get('longitude0'))
    self.projection = args.get('projection')
    self.precision = args.get('precision')
    self.buffer_distance = args.get('buffer_distance')
    self.simplify_tolerance = args.get('simplify_tolerance')
    self.for_each = args.get('for_each')
    self.emulate_longitude0 = args.get('emulate_longitude0')
    if args.get('emulate_longitude0') is None and (self.projection == 'merc' or self.projection =='mill') and self.longitude0 != 0:
      self.emulate_longitude0 = True

    if args.get('viewport'):
      self.viewport = map(lambda s: float(s), args.get('viewport').split(' '))
    else:
      self.viewport = False

    # spatial reference to convert to
    self.spatialRef = osr.SpatialReference()
    projString = '+proj='+str(self.projection)+' +a=6381372 +b=6381372 +lat_0=0'
    if not self.emulate_longitude0:
      projString += ' +lon_0='+str(self.longitude0)
    self.spatialRef.ImportFromProj4(projString)

    # handle map insets
    if args.get('insets'):
      self.insets = args.get('insets')
    else:
      self.insets = []


  def convert(self, data_source, output_file):
    codes = map(lambda g: g.properties[self.config['code_field']], data_source.geometries)
    main_codes = copy.copy(codes)
    self.map.insets = []
    envelope = []
    for inset in self.insets:
      insetBbox = self.renderMapInset(data_source, inset['codes'], inset['left'], inset['top'], inset['width'])
      insetHeight = (insetBbox[3] - insetBbox[1]) * (inset['width'] / (insetBbox[2] - insetBbox[0]))
      self.map.insets.append({
        "bbox": [{"x": insetBbox[0], "y": -insetBbox[3]}, {"x": insetBbox[2], "y": -insetBbox[1]}],
        "left": inset['left'],
        "top": inset['top'],
        "width": inset['width'],
        "height": insetHeight
      })
      envelope.append(
        shapely.geometry.box(
          inset['left'], inset['top'], inset['left'] + inset['width'], inset['top'] + insetHeight
        )
      )
      for code in inset['codes']:
        main_codes.remove(code)

    insetBbox = self.renderMapInset(data_source, main_codes, self.left, self.top, self.width)
    insetHeight = (insetBbox[3] - insetBbox[1]) * (self.width / (insetBbox[2] - insetBbox[0]))
    envelope.append( shapely.geometry.box( self.left, self.top, self.left + self.width, self.top + insetHeight ) )
    mapBbox = shapely.geometry.MultiPolygon( envelope ).bounds

    self.map.width = mapBbox[2] + mapBbox[0]
    self.map.height = mapBbox[3] + mapBbox[1]
    self.map.insets.append({
      "bbox": [{"x": insetBbox[0], "y": -insetBbox[3]}, {"x": insetBbox[2], "y": -insetBbox[1]}],
      "left": self.left,
      "top": self.top,
      "width": self.width,
      "height": insetHeight
    })
    self.map.projection = {"type": self.projection, "centralMeridian": float(self.longitude0)}

    open(output_file, 'w').write( self.map.getJSCode() )

    if self.for_each is not None:
      for code in codes:
        childConfig = copy.deepcopy(self.for_each)
        for param in ('input_file', 'output_file', 'where', 'name'):
          childConfig[param] = childConfig[param].replace('{{code}}', code.lower())
        converter = Converter(childConfig)
        converter.convert(childConfig['output_file'])

  def renderMapInset(self, data_source, codes, left, top, width):
    envelope = []
    geometries = filter(lambda g: g.properties[self.config['code_field']] in codes, data_source.geometries)
    for geometry in geometries:
      envelope.append( geometry.geom.envelope )

    bbox = shapely.geometry.MultiPolygon( envelope ).bounds

    scale = (bbox[2]-bbox[0]) / width

    # generate SVG paths
    for geometry in geometries:
      geom = geometry.geom
      if self.buffer_distance:
        geom = geom.buffer(self.buffer_distance*scale, 1)
      if geom.is_empty:
        continue
      if self.simplify_tolerance:
        geom = geom.simplify(self.simplify_tolerance*scale, preserve_topology=True)
      if isinstance(geom, shapely.geometry.multipolygon.MultiPolygon):
        polygons = geom.geoms
      else:
        polygons = [geom]
      path = ''
      for polygon in polygons:
        rings = []
        rings.append(polygon.exterior)
        rings.extend(polygon.interiors)
        for ring in rings:
          for pointIndex in range( len(ring.coords) ):
            point = ring.coords[pointIndex]
            if pointIndex == 0:
              path += 'M'+str( round( (point[0]-bbox[0]) / scale + left, self.precision) )
              path += ','+str( round( (bbox[3] - point[1]) / scale + top, self.precision) )
            else:
              path += 'l' + str( round(point[0]/scale - ring.coords[pointIndex-1][0]/scale, self.precision) )
              path += ',' + str( round(ring.coords[pointIndex-1][1]/scale - point[1]/scale, self.precision) )
          path += 'Z'
      self.map.addPath(path, geometry.properties[self.config['code_field']], geometry.properties[self.config['name_field']])
    return bbox


class Geometry:
  def __init__(self, geometry, properties):
    self.geom = geometry
    self.properties = properties


class GeometryProperty(Variable):
  operations = set(["equality", "membership"])

  def __init__(self, name):
    self.name = name

  def equals(self, value, context):
    return context[self.name] == value

  def belongs_to(self, value, context):
    return value in context[self.name]

  def is_subset(self, value, context):
    return set(value).issubset(set(context[self.name]))

  def to_python(self, value):
    return unicode(value[self.name])


class DataSource:
  def __init__(self, config):
    default_config = {
      "projection": "merc",
      "longitude0": 0
    }
    default_config.update(config)
    self.config = default_config

    self.spatialRef = osr.SpatialReference()
    projString = '+proj='+str(self.config['projection'])+' +a=6381372 +b=6381372 +lat_0=0'
    #if 'emulate_longitude0' in self.config and not self.config['emulate_longitude0']:
    projString += ' +lon_0='+str(self.config['longitude0'])
    self.spatialRef.ImportFromProj4(projString)

  def load_data(self):
    self.source = ogr.Open( self.config['file_name'], update = 0 )
    self.layer = self.source.GetLayer(0)
    if 'filter' in self.config and self.config['filter'] is not None:
      self.layer.SetAttributeFilter( self.config['filter'].encode('ascii') )
    self.layer_dfn = self.layer.GetLayerDefn()

    self.fields = []
    field_count = self.layer_dfn.GetFieldCount()
    for field_index in range(field_count):
      field = self.layer_dfn.GetFieldDefn( field_index )
      self.fields.append({
        'name': field.GetName(),
        'type': field.GetType(),
        'width': field.GetWidth(),
        'precision': field.GetPrecision()
      })

    self.geometries = []

    for feature in self.layer:
      geometry = feature.GetGeometryRef()
      geometry.TransformTo( self.spatialRef )
      geometry = shapely.wkb.loads( geometry.ExportToWkb() )
      if not geometry.is_valid:
        geometry = geometry.buffer(0)
      properties = {}
      for field in self.fields:
        properties[field['name']] = feature.GetFieldAsString(field['name']).decode('utf-8')
      self.geometries.append( Geometry(geometry, properties) )

    self.layer.ResetReading()

    self.create_grammar()

  def create_grammar(self):
    root_table = SymbolTable("root",
      map( lambda f: Bind(f['name'], GeometryProperty(f['name'])), self.fields )
    )

    tokens = {
      'not': 'not',
      'eq': '==',
      'ne': '!=',
      'belongs_to': 'in',
      'is_subset': 'are included in',
      'or': "or",
      'and': 'and'
    }
    grammar = Grammar(**tokens)
    self.parse_manager = EvaluableParseManager(root_table, grammar)

  def output(self, output):
    if output.get('format') == 'jvectormap':
      self.output_jvm(output)
    else:
      self.output_ogr(output)

  def output_ogr(self, output):
    driver = ogr.GetDriverByName( 'ESRI Shapefile' )
    if os.path.exists( output['file_name'] ):
      driver.DeleteDataSource( output['file_name'] )
    source = driver.CreateDataSource( output['file_name'] )
    layer = source.CreateLayer( self.layer_dfn.GetName(),
                                geom_type = self.layer_dfn.GetGeomType(),
                                srs = self.layer.GetSpatialRef() )

    for field in self.fields:
      fd = ogr.FieldDefn( str(field['name']), field['type'] )
      fd.SetWidth( field['width'] )
      if 'precision' in field:
        fd.SetPrecision( field['precision'] )
      layer.CreateField( fd )

    for geometry in self.geometries:
      if geometry.geom is not None:
        feature = ogr.Feature( feature_def = layer.GetLayerDefn() )
        for index, field in enumerate(self.fields):
          if field['name'] in geometry.properties:
            feature.SetField( index, geometry.properties[field['name']].encode('utf-8') )
          else:
            feature.SetField( index, '' )
        feature.SetGeometryDirectly(
          ogr.CreateGeometryFromWkb(
            shapely.wkb.dumps(
              geometry.geom
            )
          )
        )
        layer.CreateFeature( feature )
        feature.Destroy()

    source.Destroy()

  def output_jvm(self, output):
    params = copy.deepcopy(output['params'])
    params.update({
      "projection": self.config["projection"],
      "longitude0": self.config["longitude0"]
    })
    converter = Converter(params)
    converter.convert(self, output['file_name'])

class PolygonSimplifier:
  def __init__(self, geometries):
    self.format = '%.8f %.8f'
    self.tolerance = 0.05
    self.geometries = geometries

    connections = {}
    counter = 0
    for geom in geometries:
      counter += 1
      polygons = []

      if isinstance(geom, shapely.geometry.Polygon):
        polygons.append(geom)
      else:
        for polygon in geom:
          polygons.append(polygon)

      for polygon in polygons:
        if polygon.area > 0:
          lines = []
          lines.append(polygon.exterior)
          for line in polygon.interiors:
            lines.append(line)

          for line in lines:
            for i in range(len(line.coords)-1):
              indexFrom = i
              indexTo = i+1
              pointFrom = self.format % line.coords[indexFrom]
              pointTo = self.format % line.coords[indexTo]
              if pointFrom == pointTo:
                continue
              if not (pointFrom in connections):
                connections[pointFrom] = {}
              connections[pointFrom][pointTo] = 1
              if not (pointTo in connections):
                connections[pointTo] = {}
              connections[pointTo][pointFrom] = 1
    self.connections = connections
    self.simplifiedLines = {}
    self.pivotPoints = {}

  def simplifyRing(self, ring):
    coords = list(ring.coords)[0:-1]
    simpleCoords = []

    isPivot = False
    pointIndex = 0
    while not isPivot and pointIndex < len(coords):
      pointStr = self.format % coords[pointIndex]
      pointIndex += 1
      isPivot = ((len(self.connections[pointStr]) > 2) or (pointStr in self.pivotPoints))
    pointIndex = pointIndex - 1

    if not isPivot:
      simpleRing = shapely.geometry.LineString(coords).simplify(self.tolerance)
      if len(simpleRing.coords) <= 2:
        return None
      else:
        self.pivotPoints[self.format % coords[0]] = True
        self.pivotPoints[self.format % coords[-1]] = True
        simpleLineKey = self.format % coords[0]+':'+self.format % coords[1]+':'+self.format % coords[-1]
        self.simplifiedLines[simpleLineKey] = simpleRing.coords
        return simpleRing
    else:
      points = coords[pointIndex:len(coords)]
      points.extend(coords[0:pointIndex+1])
      iFrom = 0
      for i in range(1, len(points)):
        pointStr = self.format % points[i]
        if ((len(self.connections[pointStr]) > 2) or (pointStr in self.pivotPoints)):
          line = points[iFrom:i+1]
          lineKey = self.format % line[-1]+':'+self.format % line[-2]+':'+self.format % line[0]
          if lineKey in self.simplifiedLines:
            simpleLine = self.simplifiedLines[lineKey]
            simpleLine = list(reversed(simpleLine))
          else:
            simpleLine = shapely.geometry.LineString(line).simplify(self.tolerance).coords
            lineKey = self.format % line[0]+':'+self.format % line[1]+':'+self.format % line[-1]
            self.simplifiedLines[lineKey] = simpleLine
          simpleCoords.extend( simpleLine[0:-1] )
          iFrom = i
      if len(simpleCoords) <= 2:
        return None
      else:
        return shapely.geometry.LineString(simpleCoords)

  def simplifyPolygon(self, polygon):
    simpleExtRing = self.simplifyRing(polygon.exterior)
    if simpleExtRing is None:
      return None
    simpleIntRings = []
    for ring in polygon.interiors:
      simpleIntRing = self.simplifyRing(ring)
      if simpleIntRing is not None:
        simpleIntRings.append(simpleIntRing)
    return shapely.geometry.Polygon(simpleExtRing, simpleIntRings)

  def simplify(self):
    results = []
    for geom in self.geometries:
      polygons = []
      simplePolygons = []

      if isinstance(geom, shapely.geometry.Polygon):
        polygons.append(geom)
      else:
        for polygon in geom:
          polygons.append(polygon)

      for polygon in polygons:
        simplePolygon = self.simplifyPolygon(polygon)
        if not (simplePolygon is None or simplePolygon._geom is None):
          simplePolygons.append(simplePolygon)

      if len(simplePolygons) > 0:
        results.append(shapely.geometry.MultiPolygon(simplePolygons))
      else:
        results.append(None)
    return results


class Processor:
  def __init__(self, config):
    self.config = config

  def process(self):
    self.data_sources = {}
    for action in self.config:
      getattr(self, action['name'])( action, self.data_sources.get(".") )

  def read_data(self, config, data_source):
    self.data_sources["."] = DataSource( config )
    self.data_sources["."].load_data()

  def write_data(self, config, data_source):
    data_source.output( config )

  def union(self, config, data_source):
    groups = {}
    geometries = []
    for geometry in data_source.geometries:
      if geometry.properties[config['by']] in groups:
        groups[geometry.properties[config['by']]]['geoms'].append(geometry.geom)
      else:
        groups[geometry.properties[config['by']]] = {
          'geoms': [geometry.geom],
          'properties': geometry.properties
        }
    for key in groups:
      geometries.append( Geometry(shapely.ops.cascaded_union( groups[key]['geoms'] ), groups[key]['properties']) )
    data_source.geometries = geometries

  def merge(self, config, data_source):
    new_geometries = []
    for rule in config['rules']:
      expression = data_source.parse_manager.parse( rule['where'] )
      geometries = filter(lambda g: expression(g.properties), data_source.geometries)
      geometries = map(lambda g: g.geom, geometries)
      new_geometries.append( Geometry(shapely.ops.cascaded_union( geometries ), rule['fields']) )
    data_source.fields = config['fields']
    data_source.geometries = new_geometries

  def join_data(self, config, data_source):
    field_names = [f['name'] for f in config['fields']]
    if 'data' in config:
      data_col = config['data']
    else:
      data_file = open(config['file_name'], 'rb')
      data_col = csv.reader(data_file, delimiter='\t', quotechar='"')
    data = {}
    for row in data_col:
      row_dict = dict(zip(field_names, row))
      data[row_dict.pop(config['on'])] = row_dict
    for geometry in data_source.geometries:
      if geometry.properties[config['on']] in data:
        geometry.properties.update( data[geometry.properties[config['on']]] )
    field_names = map(lambda f: f['name'], data_source.fields)
    data_source.fields = data_source.fields + filter(lambda f: f['name'] not in field_names, config['fields'])

  def remove(self, config, data_source):
    expression = data_source.parse_manager.parse( config['where'] )
    data_source.geometries = filter(lambda g: not expression(g.properties), data_source.geometries)

  def remove_fields(self, config, data_source):
    data_source.fields = filter(lambda f: f.name not in config['fields'], data_source.fields)

  def remove_other_fields(self, config, data_source):
    data_source.fields = filter(lambda f: f['name'] in config['fields'], data_source.fields)

  def buffer(self, config, data_source):
    for geometry in data_source.geometries:
      geometry.geom = geometry.geom.buffer(config['distance'], config['resolution'])

  def simplify_adjancent_polygons(self, config, data_source):
    simple_geometries = PolygonSimplifier( map( lambda g: g.geom, data_source.geometries ) ).simplify()
    for i in range(len(data_source.geometries)):
      data_source.geometries[i].geom = simple_geometries[i]

  def intersect_rect(self, config, data_source):
    transform = osr.CoordinateTransformation( data_source.layer.GetSpatialRef(), data_source.spatialRef )
    point1 = transform.TransformPoint(config['rect'][0], config['rect'][1])
    point2 = transform.TransformPoint(config['rect'][2], config['rect'][3])
    rect = shapely.geometry.box(point1[0], point1[1], point2[0], point2[1])
    for geometry in data_source.geometries:
      geometry.geom = geometry.geom.intersection(rect)

  def remove_small_polygons(self, config, data_source):
    for geometry in data_source.geometries:
      if isinstance(geometry.geom, shapely.geometry.multipolygon.MultiPolygon):
        polygons = geometry.geom.geoms
      else:
        polygons = [geometry.geom]
      polygons = filter(lambda p: p.area > config['minimal_area'], polygons)
      if len(polygons) > 0:
        geometry.geom = shapely.geometry.multipolygon.MultiPolygon(polygons)


args = {}
if len(sys.argv) > 1:
  paramsJson = open(sys.argv[1], 'r').read()
else:
  paramsJson = sys.stdin.read()
paramsJson = json.loads(paramsJson)

processor = Processor(paramsJson)
processor.process()
