const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    bundle: "./src/index.js",
  },

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public"),
    clean: true,
    assetModuleFilename: "images/[name][ext][query]",
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "../"),
    },
    open: true,
    port: 3000,
    devMiddleware: {
      writeToDisk: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: {
                filter: (url) => {
                  if (url.includes("fonts/bootstrap-icons")) {
                    return true;
                  }
                  return false;
                },
              },
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  devtool: devMode ? "source-map" : "eval",
  watchOptions: {
    ignored: /node_modules/,
  },
};
