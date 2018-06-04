const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

//https://webpack.js.org/plugins/html-webpack-plugin/
const htmlPlugin = new HtmlWebPackPlugin({
  template: "public/index.html",
  // favicon: "public/favicon.ico",
  // filename: "index.html",
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    useShortDoctype: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  }
});

//replacement for ExtractTextWebpackPlugin
const extractPlugin = new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css"
});

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: ["./config/polyfills.js", "./src/index.js"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: "/"
    },
    devtool: isProduction ? false : "eval-source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader?emitWarning"] //order matters
        },
        {
          test: /\.(css|scss)$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true, //set to false if you don't want to use css modules
                camelCase: true,
                sourceMap: true,
                minimize: true, //skip in development?
                localIdentName: "[name]_[local]_[hash:base64:5]"
                // importLoaders: 2
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [
                  autoprefixer({
                    browsers: [">1%", "last 4 versions", "Firefox ESR", "ie 11"]
                  })
                ]
              }
            },
            //this can be removed if you don't use sass
            "sass-loader"
          ]
        },
        {
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
          loader: "url-loader",
          options: { limit: 4096, name: "[name].[hash:8].[ext]" }
        }
      ]
    },
    devServer: {
      compress: true,
      overlay: true,
      historyApiFallback: true, //redirect 404 to index.html
      stats: "minimal"
    },
    stats: { children: false, modules: false, moduleTrace: false },
    performance: { hints: false },
    plugins: [htmlPlugin, extractPlugin]
  };
};
