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

  var result = UglifyJS.minify(str, options);

  return result.code;
};
