const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'app': path.resolve(__dirname, 'src/my-app'),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js',
  },
  resolve: {
    // ビルド対象に含めたい（requireしている）ファイルの拡張子を指定
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  // ソースマップの設定
  devtool: 'inline-source-map',
  // 開発サーバーの設定
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    port: 5000,
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/),
    // webpackでバンドルされたファイル(app.bundle.js)のscriptタグを
    // 指定したhtmlに自動で埋め込んでくれるプラグイン
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    // コード変更があるとブラウザ内のコンテンツが自動的に更新するプラグイン
    // ※ 更新時にページの全読み込みは発生せず、フォーム入力等のステートが
    //    保存されたまま修正した箇所のみが更新される。
    new webpack.HotModuleReplacementPlugin(),
  ],
};
