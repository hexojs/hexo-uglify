'use strict';

var UglifyJS = require('uglify-js');
var micromatch = require('micromatch');

module.exports = function(str, data) {
  var options = this.config.uglify;

  var path = data.path;
  var exclude = options.exclude;

  if (path && exclude && exclude.length) {
    if (micromatch.isMatch(path, exclude, { basename: true })) return str;
  }

  // Remove unsupported options for UglifyJS
  const jsOptions = Object.assign({}, options)
  delete jsOptions.exclude

  var result = UglifyJS.minify(str, jsOptions);

  return result.code;
};

