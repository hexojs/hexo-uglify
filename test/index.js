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

  it('es5 - terser (default options)', async () => {
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

    const result = await terserFilter.apply(ctx, [code, { path: 'source/test.js' }]);

    result.length.should.below(code.length);
  });

  it('es6 - terser (default options)', async () => {
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

    const result = await terserFilter.apply(ctx, [code, { path: 'source/test.js' }]);

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

  it('exclude - terser should ignore *.min.js by default', async () => {
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

    const result = await terserFilter.apply(ctx, [code, { path: 'source/test.min.js' }]);

    result.should.eql(code);
  });

  describe('after_render', () => {
    const Hexo = require('hexo');
    const hexo = new Hexo(__dirname, { silent: true });
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
    const defaultCfg = JSON.parse(JSON.stringify(Object.assign(hexo.config, {
      uglify: {
        mangle: true,
        output: {},
        compress: {},
        exclude: '*.min.js',
        es6: true
      }
    })));

    beforeEach(() => {
      hexo.config = JSON.parse(JSON.stringify(defaultCfg));
    });

    it('default', async () => {
      const fn = require('../lib/filter-terser').bind(hexo);
      hexo.extend.filter.register('after_render:js', fn);
      const data = { path: null };
      const result = await hexo.extend.filter.exec('after_render:js', code, {
        args: [data]
      });
      result.length.should.below(code.length);

      hexo.extend.filter.unregister('after_render:js', fn);
    });
  });
});
