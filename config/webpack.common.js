const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const paths = require('./paths')
const pages = [
  "index","home","concept",
  'guide_layout',
  "a_pc_1",
  'component_1','sample_landing_1','cards_1'
  
]

module.exports = {
  entry: pages.reduce((config, page) =>{
    config[page] = paths.src + `/${page}.js`;
    return config
  },{}),
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: '',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ].concat(pages.map(
    (page) => new HtmlWebpackPlugin({
      favicon: paths.src + '/img/favicon.png',
      template: paths.src + `/${page}.html`,
      filename: `${page}.html`,
      chunks: [page]
    })
  )
  ),

  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'] },
      { test: /\.(?:ico|gif|png|jpg|jpeg|glb|gltf|hdr|)$/i, type: 'asset/resource',
      generator:{
        filename: './img/[hash].[ext]' 
      }
    },
      { test: /\.(?:mp3|mp4|webm|ogg)$/i, type: 'asset/videos' },
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
      //{ test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/ },
      //{ test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader', exclude: /node_modules/ }
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
}
