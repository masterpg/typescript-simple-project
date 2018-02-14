const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'public/index': path.resolve(__dirname, 'src/index.ts'),
    'test/index': path.resolve(__dirname, 'test/index.ts'),
  },
  output: {
    path: __dirname,
    filename: '[name].bundle.js',
  },
  resolve: {
    // ビルド対象に含めたい（requireしている）ファイルの拡張子を指定
    extensions: ['.ts', 'tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  // ソースマップの設定
  devtool: 'inline-source-map',
  // 開発サーバーの設定
  devServer: {
    contentBase: __dirname,
    hot: true,
    port: 5000,
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/),
    // webpackでバンドルされたファイル(app.bundle.js)のscriptタグを
    // 指定したhtmlに自動で埋め込んでくれるプラグイン
    new HtmlWebpackPlugin({
      filename: 'public/index.html',
      template: 'src/index.html',
      inject: false,
      bundle: 'index.bundle.js',
    }),
    // コード変更があるとブラウザ内のコンテンツが自動的に更新するプラグイン
    // ※ 更新時にページの全読み込みは発生せず、フォーム入力等のステートが
    //    保存されたまま修正した箇所のみが更新される。
    new webpack.HotModuleReplacementPlugin(),
  ],
};
