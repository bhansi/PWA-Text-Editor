const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'A PWA based JavaScript text editor.',
        background_color: '#403c3c',
        theme_color: '#403c3c',
        start_url: './',
        publicPath: './',
        icons: [{
          src: path.resolve('src/images/logo.png'),
          sizes: [ 96, 128, 192, 256, 384, 512 ],
          destination: path.join('assets', 'icons')
        }]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [ '@babel/preset-env' ],
              plugins: [ '@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime' ]
            }
          }
        }
      ]
    }
  };
};
