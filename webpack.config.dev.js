const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext]",
  },
  mode: 'development',
  watch: true,
  resolve: {
    extensions: [".js"],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css|styl)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: "aplication/font-woff",
            name: "[name][contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "./assets/fonts/",
            esModule: false,
          },
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name][contenthash].css'
    }),
    // new copyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "src", "assets/images"),
    //       to: "assets/images",
    //     }
    //   ]
    // })
    new DotenvWebpackPlugin(),
  ],
};
