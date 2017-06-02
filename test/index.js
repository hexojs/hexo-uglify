var assign = require('object-assign');
var filter = require('../lib/filter');

hexo.config.uglify = assign({
  mangle: true,
  output: {},
  compress: {}
}, hexo.config.uglify);

hexo.extend.filter.register('after_render:js', filter);
