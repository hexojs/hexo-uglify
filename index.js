'use strict';

/* global hexo */

hexo.config.uglify = Object.assign({
  mangle: true,
  output: {},
  compress: {},
  exclude: '*.min.js',
  es6: false
}, hexo.config.uglify);

if (hexo.config.uglify.es6) {
  hexo.extend.filter.register('after_render:js', require('./lib/filter-terser'));
} else {
  hexo.extend.filter.register('after_render:js', require('./lib/filter-uglifyjs'));
}
