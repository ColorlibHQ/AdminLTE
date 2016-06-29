// Delete images in build directory
// After compressing the images in the build/img dir, there is no need
// for them
'use strict';

module.exports = function (grunt) {
  return {
    build: ["build/img/*"]
  };
};
