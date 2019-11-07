'use strict';

const { minify } = require('terser');
const { isMatch } = require('micromatch');

module.exports = function(str, data) {
  const options = this.config.uglify;

  const { path } = data;
  const { exclude } = options;

  if (path && exclude && exclude.length) {
    if (isMatch(path, exclude, { basename: true })) return str;
  }

  // Remove unsupported options for UglifyJS
  const jsOptions = Object.assign({}, options);
  delete jsOptions.exclude;
  delete jsOptions.es6;

  const { code } = minify(str, jsOptions);

  return code;
};
