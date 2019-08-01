'use strict';

const UglifyJS = require('uglify-js');
const micromatch = require('micromatch');

module.exports = function(str, data) {
  const options = this.config.uglify;

  const path = data.path;
  const exclude = options.exclude;

  if (path && exclude && exclude.length) {
    if (micromatch.isMatch(path, exclude, { basename: true })) return str;
  }

  // Remove unsupported options for UglifyJS
  const jsOptions = Object.assign({}, options)
  delete jsOptions.exclude

  const result = UglifyJS.minify(str, jsOptions);

  return result.code;
};

