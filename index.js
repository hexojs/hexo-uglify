'use strict';

/* global hexo */

hexo.config.uglify = Object.assign({
  exclude: ['*.min.js'],
  mangle: true,
  output: {},
  compress: {}
}, hexo.config.uglify);

hexo.extend.filter.register('after_render:js', require('./lib/filter'));
