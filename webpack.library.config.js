const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfig = {
  entry: './src/library.js',
  mode: 'development',
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
}

module.exports = [
  // umd config
  {
    ...baseConfig,

    plugins: [
      new MiniCssExtractPlugin({
        runtime: false,
        filename: '../gss-cogs-chart-builder.css'
      })
    ],
    module: {
      ...baseConfig.module,
      rules: [
        ...baseConfig.module.rules,
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist/umd'),
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
      path: path.resolve(__dirname, 'dist/cjs'),
      libraryTarget: 'commonjs2',
      filename: 'chart-builder.cjs.js',
      auxiliaryComment: 'chart-builder components'
    },
  }

];