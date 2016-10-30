import path from 'path';

const includePaths = [
  require.resolve('normalize-scss')
].map(path.dirname.bind(path));

export default {
  assemble: {
    data: {},
    registerTags(nunj, app) {}
  },
  browserSync: {
    open: true
  },
  eslint: {
    generate: true
  },
  webpack: {
    shouldRev: true,
    includePaths,
    integrity: 'sha256',
    expose: {},
    alias: {
      redux: 'redux/lib/index.js' // jsnext:main breaks karma ¯\_(ツ)_/¯
    },
    externals: [
      {
        name: {
          jquery: 'jQuery'
        },
        provide: {
          'global.jQuery': 'jquery',
          'window.jQuery': 'jquery',
          '$': 'jquery'
        }
      }
    ],
    hot: true,
    loaders(config, l) {
      const {loaders} = l;
      const nunjucksLoader = {
        test: /\.html$/,
        loader: 'nunjucks',
        query: {
          config: path.resolve(__dirname, '..', '..', 'src/js/config/nunjucks-config.js')
        }
      };
      const [babelLoader] = loaders;
      const ogExclude = babelLoader.exclude;
      const exclude = fp => {
        if (fp.indexOf('nunjucks-config') > 0) {
          return false;
        }

        return ogExclude(fp);
      };

      babelLoader.exclude = exclude;
      loaders.push(nunjucksLoader);

      return l;
    }
  },
  cb(config) {
    const {environment} = config;
    const {branch, asset_path: assetPath} = environment;

    if (branch) {
      Object.assign(environment, {
        asset_path: assetPath.replace(branch + '/', '')
      });
    }

    return config;
  }
};
