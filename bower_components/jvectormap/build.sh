#!/bin/bash

files=( \
  jquery-jvectormap.js \
  jquery-mousewheel.js \
  lib/jvectormap.js \
  lib/abstract-element.js \
  lib/abstract-canvas-element.js \
  lib/abstract-shape-element.js \
  lib/svg-element.js \
  lib/svg-group-element.js \
  lib/svg-canvas-element.js \
  lib/svg-shape-element.js \
  lib/svg-path-element.js \
  lib/svg-circle-element.js \
  lib/vml-element.js \
  lib/vml-group-element.js \
  lib/vml-canvas-element.js \
  lib/vml-shape-element.js \
  lib/vml-path-element.js \
  lib/vml-circle-element.js \
  lib/vector-canvas.js \
  lib/simple-scale.js \
  lib/ordinal-scale.js \
  lib/numeric-scale.js \
  lib/color-scale.js \
  lib/data-series.js \
  lib/proj.js \
  lib/world-map.js \
)

baseDir=`dirname $0`

counter=0
while [ $counter -lt ${#files[@]} ]; do
  files[$counter]="$baseDir/${files[$counter]}"
  let counter=counter+1
done

if [ -z "$1" ]
  then
    minified=jquery.jvectormap.min.js
  else
    minified=$1
fi

if [ -a $minified ]
  then
    rm $minified
fi

cat ${files[*]} >> $minified

uglifyjs --overwrite $minified
