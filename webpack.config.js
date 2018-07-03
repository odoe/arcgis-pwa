const ArcGISPlugin = require("@arcgis/webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const WorkboxPlugin = require("workbox-webpack-plugin");

const path = require("path");
const webpack = require("webpack");

module.exports = function(_, arg) {
  const config = {
    entry: {
      index: "./src/index.js"
    },
    output: {
      filename: "[name].bundle.js",
      publicPath: ""
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: false
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            discardComments: {
              removeAll: true
            },
            // Run cssnano in safe mode to avoid
            // potentially unsafe transformations.
            safe: true
          }
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, "src"),
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: false }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(jpe?g|png|gif|webp)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                // Inline files smaller than 10 kB (10240 bytes)
                limit: 10 * 1024,
              }
            },
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: "65-90",
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
              }
            }
          ]
        },
        {
          test: /\.(wsv|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "build/[name].[ext]"
              }
            },
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: "65-90",
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "resolve-url-loader",
              options: { includeRoot: true }
            },
            "sass-loader?sourceMap"
          ]
        }
      ]
    },
  
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      
      new ArcGISPlugin({
        useDefaultAssetLoaders: false
      }),
  
      new HtmlWebPackPlugin({
        title: "ArcGIS Template Application",
        template: "./src/index.ejs",
        filename: "./index.html",
        favicon: "./src/assets/favicon.ico",
        chunksSortMode: "none",
        inlineSource: ".(css)$",
        mode: arg.mode
      }),
  
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
  
      new HtmlWebpackInlineSourcePlugin(),
  
      new WebpackPwaManifest({
        name: "ArcGIS Application Template",
        short_name: "ArcGISWebApp",
        description: "My ArcGIS Template Application",
        background_color: "#0079c1",
        theme_color: "#0079c1",
        icons: [
          {
            src: path.resolve("src/assets/icon.png"),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
          }
        ]
      })
    ],
  
    resolve: {
      modules: [path.resolve(__dirname, "/src"), "node_modules/"],
      extensions: [".js", ".scss"]
    },
  
    node: {
      process: false,
      global: false,
      fs: "empty"
    }
  };

  if (arg.mode === "production") {
    config.plugins.push(
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/
      })
    );
    config.plugins.push(
      new WorkboxPlugin.GenerateSW({
        // Exclude images from the precache
        exclude: [/\.(?:png|jpg|jpeg|svg|gif)$/],

        // Define runtime caching rules.
        runtimeCaching: [
          {
            // Match any request ends with .png, .jpg, .jpeg or .svg.
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            // Apply a cache-first strategy.
            handler: "cacheFirst"
          },
          {
            // Match any fonts
            urlPattern: /\.(?:eot|ttf|jpeg|woff|woff2)$/,
            // Apply a cache-first strategy.
            handler: "cacheFirst"
          },
          {
            urlPattern: new RegExp("https://js.arcgis.com"),
            handler: "staleWhileRevalidate"
          },
          {
            urlPattern: new RegExp("https://basemaps.arcgis.com"),
            handler: "staleWhileRevalidate"
          },
          {
            urlPattern: new RegExp("https://arcgis.com/sharing"),
            handler: "staleWhileRevalidate"
          }
        ]
      })
    );
  }

  return config;
}