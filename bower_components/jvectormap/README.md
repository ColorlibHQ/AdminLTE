This is an official git repository for the jVectorMap plug-in for jQuery. Its main purpose is to show interactive vector maps on the web pages.

You can find maps, documentation, examples and more at [the official site](http://jvectormap.com/)

It also includes a converter that could be used to create your own maps for jVectorMap from the data in various GIS formats like Shapefile. The following command could be used to convert USA map from the data available at [www.naturalearthdata.com](http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-1-states-provinces/):

    python \
      path/to/converter.py \
      path/to/geo-data.shp \
      path/to/resulting-map.js \
      --width 900 \
      --country_name_index 4 \
      --where "ISO = 'USA'" \
      --codes_file path/to/codes-en.tsv \
      --insets '[{"codes": ["US-AK"], "width": 200, "left": 10, "top": 370}, {"codes": ["US-HI"], "width": 100, "left": 220, "top": 400}]' \
      --minimal_area 4000000 \
      --buffer_distance -0.5 \
      --simplify_tolerance 1000 \
      --longitude0 -10.15 \
      --name us