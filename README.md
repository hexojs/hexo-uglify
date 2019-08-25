# hexo-uglify

[![Build Status](https://travis-ci.org/hexojs/hexo-uglify.svg?branch=master)](https://travis-ci.org/hexojs/hexo-uglify)
[![NPM version](https://badge.fury.io/js/hexo-uglify.svg)](https://www.npmjs.com/package/hexo-uglify)

Minify JavaScript files with [UglifyJS].

## Installation

``` bash
$ npm install hexo-uglify --save
```

## Options

``` yaml
uglify:
  mangle: true
  output:
  compress:
  exclude: 
    - *.min.js
```

- **mangle**: Mangle file names
- **output**: Output options
- **compress**: Compress options
- **exclude**: Exclude files

[UglifyJS]: http://lisperator.net/uglifyjs/
