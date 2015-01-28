var UglifyJS = require('uglify-js');
var assign = require('object-assign');

module.exports = function(str){
  var options = assign({
    fromString: true
  }, this.config.uglify);

  var result = UglifyJS.minify(str, options);

  return result.code;
};