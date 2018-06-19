#
# jVectorMap version 2.0.4
#
# Copyright 2011-2013, Kirill Lebedev
#

import sys
import shapely.geometry
import shapely.wkb
import shapely.affinity
from osgeo import ogr
from osgeo import osr
import json
import codecs
import copy

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
    return "jQuery.fn.vectorMap('addMap', '"+self.name+"_"+self.projection['type']+"_"+self.language+"',"+json.dumps(map)+');'


class Converter:
  def __init__(self, config):
    args = {
      'buffer_distance': -0.4,
      'simplify_tolerance': 0.2,
      'longitude0': 0,
      'projection': 'mill',
      'name': 'world',
      'width': 900,
      'language': 'en',
      'precision': 2,
      'insets': []
    }
    args.update(config)

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

  def loadData(self):
    for sourceConfig in self.sources:
      self.loadDataSource( sourceConfig )

  def loadDataSource(self, sourceConfig):
    source = ogr.Open( sourceConfig['input_file'] )
    layer = source.GetLayer(0)
    layer.SetAttributeFilter( sourceConfig['where'].encode('ascii') )
    self.viewportRect = False

    transformation = osr.CoordinateTransformation( layer.GetSpatialRef(), self.spatialRef )
    if self.viewport:
      layer.SetSpatialFilterRect( *self.viewport )
      point1 = transformation.TransformPoint(self.viewport[0], self.viewport[1])
      point2 = transformation.TransformPoint(self.viewport[2], self.viewport[3])
      self.viewportRect = shapely.geometry.box(point1[0], point1[1], point2[0], point2[1])

    layer.ResetReading()

    codes = {}

    if self.emulate_longitude0:
      meridian = -180 + self.longitude0
      p1 = transformation.TransformPoint(-180, 89)
      p2 = transformation.TransformPoint(meridian, -89)
      left = shapely.geometry.box(p1[0], p1[1], p2[0], p2[1])
      p3 = transformation.TransformPoint(meridian, 89)
      p4 = transformation.TransformPoint(180, -89)
      right = shapely.geometry.box(p3[0], p3[1], p4[0], p4[1])

    # load features
    nextCode = 0
    for feature in layer:
      geometry = feature.GetGeometryRef()
      geometryType = geometry.GetGeometryType()

      if geometryType == ogr.wkbPolygon or geometryType == ogr.wkbMultiPolygon:
        geometry.TransformTo( self.spatialRef )
        shapelyGeometry = shapely.wkb.loads( geometry.ExportToWkb() )
        if not shapelyGeometry.is_valid:
          shapelyGeometry = shapelyGeometry.buffer(0, 1)

        if self.emulate_longitude0:
          leftPart = shapely.affinity.translate(shapelyGeometry.intersection(left), p4[0] - p3[0])
          rightPart = shapely.affinity.translate(shapelyGeometry.intersection(right), p1[0] - p2[0])
          shapelyGeometry = leftPart.buffer(0.1, 1).union(rightPart.buffer(0.1, 1)).buffer(-0.1, 1)

        if not shapelyGeometry.is_valid:
          shapelyGeometry = shapelyGeometry.buffer(0, 1)
        shapelyGeometry = self.applyFilters(shapelyGeometry)
        if shapelyGeometry:
          name = feature.GetFieldAsString(str(sourceConfig.get('name_field'))).decode(sourceConfig.get('input_file_encoding'))
          code = feature.GetFieldAsString(str(sourceConfig.get('code_field'))).decode(sourceConfig.get('input_file_encoding'))
          if code in codes:
            code = '_' + str(nextCode)
            nextCode += 1
          codes[code] = name
          self.features[code] = {"geometry": shapelyGeometry, "name": name, "code": code}
      else:
        raise Exception, "Wrong geometry type: "+geometryType


  def convert(self, outputFile):
    print 'Generating '+outputFile

    self.loadData()

    codes = self.features.keys()
    main_codes = copy.copy(codes)
    self.map.insets = []
    envelope = []
    for inset in self.insets:
      insetBbox = self.renderMapInset(inset['codes'], inset['left'], inset['top'], inset['width'])
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

    insetBbox = self.renderMapInset(main_codes, 0, 0, self.width)
    insetHeight = (insetBbox[3] - insetBbox[1]) * (self.width / (insetBbox[2] - insetBbox[0]))

    envelope.append( shapely.geometry.box( 0, 0, self.width, insetHeight ) )
    mapBbox = shapely.geometry.MultiPolygon( envelope ).bounds

    self.map.width = mapBbox[2] - mapBbox[0]
    self.map.height = mapBbox[3] - mapBbox[1]
    self.map.insets.append({
      "bbox": [{"x": insetBbox[0], "y": -insetBbox[3]}, {"x": insetBbox[2], "y": -insetBbox[1]}],
      "left": 0,
      "top": 0,
      "width": self.width,
      "height": insetHeight
    })
    self.map.projection = {"type": self.projection, "centralMeridian": float(self.longitude0)}

    open(outputFile, 'w').write( self.map.getJSCode() )

    if self.for_each is not None:
      for code in codes:
        childConfig = copy.deepcopy(self.for_each)
        for param in ('input_file', 'output_file', 'where', 'name'):
          childConfig[param] = childConfig[param].replace('{{code}}', code.lower())
        converter = Converter(childConfig)
        converter.convert(childConfig['output_file'])

  def renderMapInset(self, codes, left, top, width):
    envelope = []
    for code in codes:
      envelope.append( self.features[code]['geometry'].envelope )

    bbox = shapely.geometry.MultiPolygon( envelope ).bounds

    scale = (bbox[2]-bbox[0]) / width

    # generate SVG paths
    for code in codes:
      feature = self.features[code]
      geometry = feature['geometry']
      if self.buffer_distance:
        geometry = geometry.buffer(self.buffer_distance*scale, 1)
      if geometry.is_empty:
        continue
      if self.simplify_tolerance:
        geometry = geometry.simplify(self.simplify_tolerance*scale, preserve_topology=True)
      if isinstance(geometry, shapely.geometry.multipolygon.MultiPolygon):
        polygons = geometry.geoms
      else:
        polygons = [geometry]
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
      self.map.addPath(path, feature['code'], feature['name'])
    return bbox


  def applyFilters(self, geometry):
    if self.viewportRect:
      geometry = self.filterByViewport(geometry)
      if not geometry:
        return False
    if self.minimal_area:
      geometry = self.filterByMinimalArea(geometry)
      if not geometry:
        return False
    return geometry


  def filterByViewport(self, geometry):
    try:
      return geometry.intersection(self.viewportRect)
    except shapely.geos.TopologicalError:
      return False


  def filterByMinimalArea(self, geometry):
    if isinstance(geometry, shapely.geometry.multipolygon.MultiPolygon):
      polygons = geometry.geoms
    else:
      polygons = [geometry]
    polygons = filter(lambda p: p.area > self.minimal_area, polygons)
    return shapely.geometry.multipolygon.MultiPolygon(polygons)


args = {}
if len(sys.argv) > 1:
  paramsJson = open(sys.argv[1], 'r').read()
else:
  paramsJson = sys.stdin.read()
paramsJson = json.loads(paramsJson)

converter = Converter(paramsJson)
converter.convert(paramsJson['output_file'])
