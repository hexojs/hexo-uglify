'use strict';

/* global hexo */

hexo.config.uglify = Object.assign({
  mangle: true,
  output: {},
  compress: {},
  exclude: '*.min.js'
}, hexo.config.uglify);

hexo.extend.filter.register('after_render:js', require('./lib/filter'));
