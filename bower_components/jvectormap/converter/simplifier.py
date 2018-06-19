import argparse
import sys
import os
from osgeo import ogr
from osgeo import osr
import anyjson
import shapely.geometry
import shapely.ops
import codecs
import time


format = '%.8f %.8f'
tolerance = 0.01
infile = '/Users/kirilllebedev/Maps/50m-admin-0-countries/ne_50m_admin_0_countries.shp'
outfile = 'map.shp'

# Open the datasource to operate on.
in_ds = ogr.Open( infile, update = 0 )
in_layer = in_ds.GetLayer( 0 )
in_defn = in_layer.GetLayerDefn()


# Create output file with similar information.
shp_driver = ogr.GetDriverByName( 'ESRI Shapefile' )
if os.path.exists('map.shp'):
  shp_driver.DeleteDataSource( outfile )
shp_ds = shp_driver.CreateDataSource( outfile )
shp_layer = shp_ds.CreateLayer( in_defn.GetName(),
                                geom_type = in_defn.GetGeomType(),
                                srs = in_layer.GetSpatialRef() )

in_field_count = in_defn.GetFieldCount()
for fld_index in range(in_field_count):
    src_fd = in_defn.GetFieldDefn( fld_index )
    fd = ogr.FieldDefn( src_fd.GetName(), src_fd.GetType() )
    fd.SetWidth( src_fd.GetWidth() )
    fd.SetPrecision( src_fd.GetPrecision() )
    shp_layer.CreateField( fd )


# Load geometries
geometries = []
for feature in in_layer:
  geometry = feature.GetGeometryRef()
  geometryType = geometry.GetGeometryType()

  if geometryType == ogr.wkbPolygon or geometryType == ogr.wkbMultiPolygon:
    shapelyGeometry = shapely.wkb.loads( geometry.ExportToWkb() )
    #if not shapelyGeometry.is_valid:
      #buffer to fix selfcrosses
      #shapelyGeometry = shapelyGeometry.buffer(0)
    if shapelyGeometry:
      geometries.append(shapelyGeometry)
in_layer.ResetReading()

start = int(round(time.time() * 1000))
# Simplification
points = []
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
          pointFrom = format % line.coords[indexFrom]
          pointTo = format % line.coords[indexTo]
          if pointFrom == pointTo:
            continue
          if not (pointFrom in connections):
            connections[pointFrom] = {}
          connections[pointFrom][pointTo] = 1
          if not (pointTo in connections):
            connections[pointTo] = {}
          connections[pointTo][pointFrom] = 1
print int(round(time.time() * 1000)) - start

simplifiedLines = {}
pivotPoints = {}
def simplifyRing(ring):
  coords = list(ring.coords)[0:-1]
  simpleCoords = []

  isPivot = False
  pointIndex = 0
  while not isPivot and pointIndex < len(coords):
    pointStr = format % coords[pointIndex]
    pointIndex += 1
    isPivot = ((len(connections[pointStr]) > 2) or (pointStr in pivotPoints))
  pointIndex = pointIndex - 1

  if not isPivot:
    simpleRing = shapely.geometry.LineString(coords).simplify(tolerance)
    if len(simpleRing.coords) <= 2:
      return None
    else:
      pivotPoints[format % coords[0]] = True
      pivotPoints[format % coords[-1]] = True
      simpleLineKey = format % coords[0]+':'+format % coords[1]+':'+format % coords[-1]
      simplifiedLines[simpleLineKey] = simpleRing.coords
      return simpleRing
  else:
    points = coords[pointIndex:len(coords)]
    points.extend(coords[0:pointIndex+1])
    iFrom = 0
    for i in range(1, len(points)):
      pointStr = format % points[i]
      if ((len(connections[pointStr]) > 2) or (pointStr in pivotPoints)):
        line = points[iFrom:i+1]
        lineKey = format % line[-1]+':'+format % line[-2]+':'+format % line[0]
        if lineKey in simplifiedLines:
          simpleLine = simplifiedLines[lineKey]
          simpleLine = list(reversed(simpleLine))
        else:
          simpleLine = shapely.geometry.LineString(line).simplify(tolerance).coords
          lineKey = format % line[0]+':'+format % line[1]+':'+format % line[-1]
          simplifiedLines[lineKey] = simpleLine
        simpleCoords.extend( simpleLine[0:-1] )
        iFrom = i
    if len(simpleCoords) <= 2:
      return None
    else:
      return shapely.geometry.LineString(simpleCoords)


def simplifyPolygon(polygon):
  simpleExtRing = simplifyRing(polygon.exterior)
  if simpleExtRing is None:
    return None
  simpleIntRings = []
  for ring in polygon.interiors:
    simpleIntRing = simplifyRing(ring)
    if simpleIntRing is not None:
      simpleIntRings.append(simpleIntRing)
  return shapely.geometry.Polygon(simpleExtRing, simpleIntRings)


results = []
for geom in geometries:
  polygons = []
  simplePolygons = []

  if isinstance(geom, shapely.geometry.Polygon):
    polygons.append(geom)
  else:
    for polygon in geom:
      polygons.append(polygon)

  for polygon in polygons:
    simplePolygon = simplifyPolygon(polygon)
    if not (simplePolygon is None or simplePolygon._geom is None):
      simplePolygons.append(simplePolygon)

  if len(simplePolygons) > 0:
    results.append(shapely.geometry.MultiPolygon(simplePolygons))
  else:
    results.append(None)


# Process all features in input layer.
in_feat = in_layer.GetNextFeature()
counter = 0
while in_feat is not None:
  if results[counter] is not None:
    out_feat = ogr.Feature( feature_def = shp_layer.GetLayerDefn() )
    out_feat.SetFrom( in_feat )
    out_feat.SetGeometryDirectly(
      ogr.CreateGeometryFromWkb(
        shapely.wkb.dumps(
          results[counter]
        )
      )
    )
    shp_layer.CreateFeature( out_feat )
    out_feat.Destroy()
  else:
    print 'geometry is too small: '+in_feat.GetField(16)

  in_feat.Destroy()
  in_feat = in_layer.GetNextFeature()
  counter += 1


# Cleanup
shp_ds.Destroy()
in_ds.Destroy()

print int(round(time.time() * 1000)) - start