'use strict';

require('chai').should();

describe('hexo-uglify', () => {
  const Hexo = require('hexo');
  const hexo = new Hexo(__dirname, { silent: true });
  const f = require('../lib/filter').bind(hexo);
  const defaultCfg = JSON.parse(JSON.stringify(Object.assign(hexo.config, {
    uglify: {
      mangle: true,
      output: {},
      compress: {},
      exclude: '*.min.js'
    }
  })));
  const es5 = `
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

  beforeEach(() => {
    hexo.config = JSON.parse(JSON.stringify(defaultCfg));
  });

  it('es5 - terser (default options)', async () => {
    const result = await f(es5, { path: 'source/test.js' });

    result.length.should.below(es5.length);
  });

  it('es6 - terser (default options)', async () => {
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

    const result = await f(code, { path: 'source/test.js' });

    result.length.should.below(code.length);
  });

  it('exclude - terser should ignore *.min.js by default', async () => {
    const result = await f(es5, { path: 'source/test.min.js' });

    result.should.eql(es5);
  });

  it('after_render', async () => {
    hexo.extend.filter.register('after_render:js', f);
    const data = { path: null };
    const result = await hexo.extend.filter.exec('after_render:js', es5, {
      args: [data]
    });
    result.length.should.below(es5.length);

    hexo.extend.filter.unregister('after_render:js', f);
  });
});
