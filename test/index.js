'use strict';

require('chai').should();

describe('hexo-uglify', () => {
  const uglifyFilter = require('../lib/filter-uglifyjs');
  const terserFilter = require('../lib/filter-terser');

  it('es5 - uglify (default options)', () => {
    const ctx = {
      config: {
        uglify: {
          mangle: true,
          output: {},
          compress: {},
          exclude: '*.min.js'
        }
      }
    };

    const code = `
    var x = {
        baz_: 0,
        foo_: 1,
        calc: function() {
            return this.foo_ + this.baz_;
        }
    };
    x.bar_ = 2;
    x["baz_"] = 3;
    console.log(x.calc());`;

    const result = uglifyFilter.apply(ctx, [code, { path: 'source/test.js' }]);

    result.length.should.below(code.length);
  });

  it('es5 - terser (default options)', () => {
    const ctx = {
      config: {
        uglify: {
          mangle: true,
          output: {},
          compress: {},
          exclude: '*.min.js'
        }
      }
    };

    const code = `
    var x = {
        baz_: 0,
        foo_: 1,
        calc: function() {
            return this.foo_ + this.baz_;
        }
    };
    x.bar_ = 2;
    x["baz_"] = 3;
    console.log(x.calc());`;

    const result = terserFilter.apply(ctx, [code, { path: 'source/test.js' }]);

    result.length.should.below(code.length);
  });

  it('es6 - terser (default options)', () => {
    const ctx = {
      config: {
        uglify: {
          mangle: true,
          output: {},
          compress: {},
          exclude: '*.min.js'
        }
      }
    };

    const code = `
    const x = {
        baz_: 0,
        foo_: 1,
        calc() {
            return this.foo_ + this.baz_;
        }
    };
    x.bar_ = (a) => a + 2;
    x["baz_"] = 3;
    console.log(x.calc());`;

    const result = terserFilter.apply(ctx, [code, { path: 'source/test.js' }]);

    result.length.should.below(code.length);
  });

  it('exclude - uglify should ignore *.min.js by default', () => {
    const ctx = {
      config: {
        uglify: {
          mangle: true,
          output: {},
          compress: {},
          exclude: '*.min.js'
        }
      }
    };

    const code = `
    var x = {
        baz_: 0,
        foo_: 1,
        calc: function() {
            return this.foo_ + this.baz_;
        }
    };
    x.bar_ = 2;
    x["baz_"] = 3;
    console.log(x.calc());`;

    const result = uglifyFilter.apply(ctx, [code, { path: 'source/test.min.js' }]);

    result.should.eql(code);
  });

  it('exclude - terser should ignore *.min.js by default', () => {
    const ctx = {
      config: {
        uglify: {
          mangle: true,
          output: {},
          compress: {},
          exclude: '*.min.js'
        }
      }
    };

    const code = `
    var x = {
        baz_: 0,
        foo_: 1,
        calc: function() {
            return this.foo_ + this.baz_;
        }
    };
    x.bar_ = 2;
    x["baz_"] = 3;
    console.log(x.calc());`;

    const result = terserFilter.apply(ctx, [code, { path: 'source/test.min.js' }]);

    result.should.eql(code);
  });
});
