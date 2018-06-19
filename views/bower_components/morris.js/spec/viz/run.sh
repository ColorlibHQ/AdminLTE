#!/bin/sh

# visual_specs.js creates output in output/XXX.png
phantomjs visual_specs.js

# clear out old diffs
mkdir -p diff
rm -f diff/*

# generate diffs
PASS=1
for i in exemplary/*.png
do
  FN=`basename $i`
  perceptualdiff $i output/$FN -output diff/$FN
  if [ $? -eq 0 ]
  then
    echo "OK:   $FN"
  else
    echo "FAIL: $FN"
    PASS=0
  fi
done

# pass / fail
if [ $PASS -eq 1 ]
then
  echo "Success."
else
  echo "Failed."
  exit 1
fi
