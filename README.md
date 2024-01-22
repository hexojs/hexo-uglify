# hexo-uglify

[![NPM version](https://badge.fury.io/js/hexo-uglify.svg)](https://www.npmjs.com/package/hexo-uglify)
[![CI](https://github.com/hexojs/hexo-uglify/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/hexojs/hexo-uglify/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/hexojs/hexo-uglify/badge.svg?branch=master)](https://coveralls.io/github/hexojs/hexo-uglify?branch=master)

Minify JavaScript files with [Terser](https://www.npmjs.com/package/terser).

## Installation

```bash
$ npm install hexo-uglify --save
```

## Options

```yaml
uglify:
  mangle: true
  output:
  compress:
  exclude:
    - "*.min.js"
```

- **exclude**: Exclude files. Use [glob expressions](https://github.com/micromatch/micromatch#extended-globbing) for path matching.
- **mangle**: Mangle file names.
- **output**: Output options.
- **compress**: Compress options.

Refer to the [docs] for more options and details.

[docs]: https://github.com/terser/terser#minify-options
