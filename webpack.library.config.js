const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env.CHART_BUILDER_ENV === 'prod';

const basePath = path.resolve(process.env.CB_OUTPUT_PATH || 'dist');

const baseConfig = {
  entry: './src/library.js',
  mode: isProd ? 'production' : 'development',
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/typescript',
              [
                '@babel/preset-react',
                {
                  'runtime': 'automatic'
                },
              ],
            ],
            plugins: ['@babel/plugin-proposal-optional-chaining']
          }
        }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.tsx', '.ts'],
  },


  externals: {
    react: 'react',
    'react/jsx-runtime': 'react/jsx-runtime',
    'react-dom': 'react-dom',
    'react-plotly.js': 'react-plotly.js'
  },

  optimization: {
    usedExports: false
  }
};

module.exports = [
  // umd config
  {
    ...baseConfig,

    plugins: [
      new MiniCssExtractPlugin({
        runtime: false,
        filename: '../gss-cogs-chart-builder.css'
      }),
      new CopyPlugin({
        patterns: [
          {from: 'README.md', to: '../README.md'},
          {
            from: 'package.library.json',
            to: '../package.json',
            transform(source) {
              return source.toString().replace('VERSION', process.env.VERSION || 'unknown');
            },
          }
        ]
      }),
    ],
    module: {
      ...baseConfig.module,
      rules: [
        ...baseConfig.module.rules,
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        }
      ]
    },
    output: {
      path: path.resolve(basePath, 'umd'),
      libraryTarget: 'umd',
      filename: 'chart-builder.umd.js',
      auxiliaryComment: 'chart-builder components'
    },

  },
  // cjs config
  {
    ...baseConfig,

    module: {
      ...baseConfig.module,
      rules: [
        ...baseConfig.module.rules,
        {
          test: /\.css$/,
          use: 'ignore-loader',
        }
      ]
    },

    output: {
      path: path.resolve(basePath, 'cjs'),
      libraryTarget: 'commonjs2',
      filename: 'chart-builder.cjs.js',
      auxiliaryComment: 'chart-builder components'
    },
  }

];