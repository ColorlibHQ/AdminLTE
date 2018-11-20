#
# jVectorMap version 1.2.2
#
# Copyright 2011-2013, Kirill Lebedev
# Licensed under the MIT license.
#

import argparse
import sys
from osgeo import ogr
from osgeo import osr
import json
import shapely.geometry
import codecs

class Map:
  def __init__(self, name, language):
    self.paths = {}
    self.name = name
    self.language = language
    self.width = 0
    self.heoght = 0
    self.bbox = []

  def addPath(self, path, code, name):
    self.paths[code] = {"path": path, "name": name}

  def getJSCode(self):
    map = {"paths": self.paths, "width": self.width, "height": self.height, "insets": self.insets, "projection": self.projection}
    return "jQuery.fn.vectorMap('addMap', '"+self.name+"_"+self.projection['type']+"_"+self.language+"',"+json.dumps(map)+');'


class Converter:
  def __init__(self, args):
    self.map = Map(args['name'], args.get('language'))

    if args.get('sources'):
      self.sources = args['sources']
    else:
      self.sources = [{
        'input_file': args.get('input_file'),
        'where': args.get('where'),
        'codes_file': args.get('codes_file'),
        'country_name_index': args.get('country_name_index'),
        'country_code_index': args.get('country_code_index'),
        'input_file_encoding': args.get('input_file_encoding')
      }]

    default_source = {
      'where': '',
      'codes_file': '',
      'country_name_index': '0',
      'country_code_index': '1',
      'input_file_encoding': 'iso-8859-1'
    }

    for index in range(len(self.sources)):
      for key in default_source:
        if self.sources[index].get(key) is None:
          self.sources[index][key] = default_source[key]

    self.features = {}
    self.width = args.get('width')
    self.minimal_area = args.get('minimal_area')
    self.longitude0 = args.get('longitude0')
    self.projection = args.get('projection')
    self.precision = args.get('precision')
    self.buffer_distance = args.get('buffer_distance')
    self.simplify_tolerance = args.get('simplify_tolerance')
    if args.get('viewport'):
      self.viewport = map(lambda s: float(s), args.get('viewport').split(' '))
    else:
      self.viewport = False


    # spatial reference to convert to
    self.spatialRef = osr.SpatialReference()
    self.spatialRef.ImportFromProj4('+proj='+self.projection+' +a=6381372 +b=6381372 +lat_0=0 +lon_0='+str(self.longitude0))

    # handle map insets
    if args.get('insets'):
      self.insets = json.loads(args.get('insets'))
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

    if self.viewport:
      layer.SetSpatialFilterRect( *sourceConfig.get('viewport') )
      transformation = osr.CoordinateTransformation( layer.GetSpatialRef(), self.spatialRef )
      point1 = transformation.TransformPoint(self.viewport[0], self.viewport[1])
      point2 = transformation.TransformPoint(self.viewport[2], self.viewport[3])
      self.viewportRect = shapely.geometry.box(point1[0], point1[1], point2[0], point2[1])

    layer.ResetReading()

    # load codes from external tsv file if present or geodata file otherwise
    codes = {}
    if sourceConfig.get('codes_file'):
      for line in codecs.open(sourceConfig.get('codes_file'), 'r', "utf-8"):
        row = map(lambda s: s.strip(), line.split('\t'))
        codes[row[1]] = row[0]
    else:
      nextCode = 0
      for feature in layer:
        code = feature.GetFieldAsString(sourceConfig.get('country_code_index'))
        if code == '-99':
          code = '_'+str(nextCode)
          nextCode += 1
        name = feature.GetFieldAsString(sourceConfig.get('country_name_index')).decode(sourceConfig.get('input_file_encoding'))
        codes[name] = code
      layer.ResetReading()

    # load features
    for feature in layer:
      geometry = feature.GetGeometryRef()
      geometryType = geometry.GetGeometryType()

      if geometryType == ogr.wkbPolygon or geometryType == ogr.wkbMultiPolygon:
        geometry.TransformTo( self.spatialRef )
        shapelyGeometry = shapely.wkb.loads( geometry.ExportToWkb() )
        if not shapelyGeometry.is_valid:
          #buffer to fix selfcrosses
          shapelyGeometry = shapelyGeometry.buffer(0, 1)
        shapelyGeometry = self.applyFilters(shapelyGeometry)
        if shapelyGeometry:
          name = feature.GetFieldAsString(sourceConfig.get('country_name_index')).decode(sourceConfig.get('input_file_encoding'))
          code = codes[name]
          self.features[code] = {"geometry": shapelyGeometry, "name": name, "code": code}
      else:
        raise Exception, "Wrong geometry type: "+geometryType


  def convert(self, outputFile):
    self.loadData()

    codes = self.features.keys()
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
        codes.remove(code)

    insetBbox = self.renderMapInset(codes, 0, 0, self.width)
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
        geometry = geometry.simplify(self.simplify_tolerance, preserve_topology=True)
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


parser = argparse.ArgumentParser(conflict_handler='resolve')
parser.add_argument('input_file')
parser.add_argument('output_file')
parser.add_argument('--country_code_index', type=int)
parser.add_argument('--country_name_index', type=int)
parser.add_argument('--codes_file', type=str)
parser.add_argument('--where', type=str)
parser.add_argument('--width', type=float)
parser.add_argument('--insets', type=str)
parser.add_argument('--minimal_area', type=float)
parser.add_argument('--buffer_distance', type=float)
parser.add_argument('--simplify_tolerance', type=float)
parser.add_argument('--viewport', type=str)
parser.add_argument('--longitude0', type=str)
parser.add_argument('--projection', type=str)
parser.add_argument('--name', type=str)
parser.add_argument('--language', type=str)
parser.add_argument('--input_file_encoding', type=str)
parser.add_argument('--precision', type=int)
args = vars(parser.parse_args())

default_args = {
  'buffer_distance': -0.4,
  'longitude0': '0',
  'projection': 'mill',
  'name': 'world',
  'language': 'en',
  'precision': 2,
  'insets': ''
}

if args['input_file'][-4:] == 'json':
  args.update( json.loads( open(args['input_file'], 'r').read() ) )

for key in default_args:
  if default_args.get(key) and args.get(key) is None:
    args[key] = default_args[key]

converter = Converter(args)
converter.convert(args['output_file'])