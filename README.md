# hexo-uglify

[![Build Status](https://travis-ci.org/hexojs/hexo-uglify.svg?branch=master)](https://travis-ci.org/hexojs/hexo-uglify)
[![NPM version](https://badge.fury.io/js/hexo-uglify.svg)](https://www.npmjs.com/package/hexo-uglify)

Minify JavaScript files.

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
  es6: false
```

- **mangle**: Mangle file names (part of uglifyjs/terser's options). Default is `true`
- **output**: Output options (part of uglifyjs/terser's options)
- **compress**: Compress options (part of uglifyjs/terser's options)
- **exclude**: Exclude files. Use [glob expressions](https://github.com/micromatch/micromatch#extended-globbing) for path matching.
- **es6**: Enable es6 compression. Default is `false`
  - When enabled, hexo-uglify will use [terser](https://github.com/terser/terser) as compressor, otherwise [uglifyjs](https://github.com/mishoo/UglifyJS2) will be used.

Refer to the [docs] for more options and details.

[docs]: https://github.com/mishoo/UglifyJS2/#minify-options
