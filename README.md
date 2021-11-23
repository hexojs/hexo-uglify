# hexo-uglify

[![Build Status](https://github.com/hexojs/hexo-uglify/actions/workflows/tester.yml/badge.svg)](https://github.com/hexojs/hexo-uglify/actions/workflows/tester.yml)
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
```

- **exclude**: Exclude files. Use [glob expressions](https://github.com/micromatch/micromatch#extended-globbing) for path matching.
- **mangle**: Mangle file names.
- **output**: Output options.
- **compress**: Compress options.

Refer to the [docs] for more options and details.

[docs]: https://github.com/terser/terser#minify-options
