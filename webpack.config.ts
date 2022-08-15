import path from "path";
import { Configuration } from "webpack";
const config: Configuration = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        exclude: /node_modules/,

        test: /\.(ts|js)?$/,
        use: {
          loader: "ts-loader",
          
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ""],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  
};
export default config;