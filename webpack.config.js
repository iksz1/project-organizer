const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");

//https://webpack.js.org/plugins/html-webpack-plugin/
const htmlPlugin = new HtmlWebPackPlugin({
  template: "public/index.html",
  favicon: "public/favicon.ico",
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
  filename: "[name].[hash:8].css",
  chunkFilename: "[id].css"
});

const manifestPlugin = new ManifestPlugin({
  fileName: "asset-manifest.json"
});

const swPlugin = new SWPrecacheWebpackPlugin({
  // By default, a cache-busting query parameter is appended to requests
  // used to populate the caches, to ensure the responses are fresh.
  // If a URL is already hashed by Webpack, then there is no concern
  // about it being stale, and the cache-busting can be skipped.
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  // dontCacheBustUrlsMatching: /./,
  filename: "service-worker.js",
  logger(message) {
    if (message.indexOf("Total precache size is") === 0) {
      // This message occurs for every build and is a bit too noisy.
      return;
    }
    if (message.indexOf("Skipping static resource") === 0) {
      // This message obscures real errors so we ignore it.
      // https://github.com/facebookincubator/create-react-app/issues/2612
      return;
    }
    console.log(message); //eslint-disable-line
  },
  minify: true,
  // For unknown URLs, fallback to the index page
  navigateFallback: "/index.html",
  // Don't precache sourcemaps (they're large) and build asset manifest:
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/, /_redirects$/]
});

const copyPlugin = new CopyWebpackPlugin([
  { from: "./public/manifest.json" },
  { from: "./public/_redirects" }
]);

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const plugins = [htmlPlugin, extractPlugin];
  if (isProduction) plugins.push(manifestPlugin, swPlugin, copyPlugin);

  return {
    entry: ["./config/polyfills.js", "./src/index.js"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[hash:8].js",
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
    plugins,
    devServer: {
      port: 3000,
      compress: true,
      overlay: true,
      historyApiFallback: true, //redirect 404 to index.html
      stats: "minimal"
    },
    stats: { children: false, modules: false, moduleTrace: false },
    performance: { hints: false }
  };
};
