const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
    entry: {
      index: "./src/index.js",
      team: "./src/team.js"
    },
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                  {
                    loader: "style-loader",
                  },
                  {
                    loader: "css-loader",
                  },
                ],

            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      outputPath: "assets/images",
                      name: "[name].[ext]",
                    },
                  },
                ],
              },
              {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
              },
        ],
    },
    performance: {hints: false},
    optimization: {splitChunks: {chunks: 'all'}},
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/template.html',
            chunks: ["index"],
            hash: true,
            filename: 'index.html'
        }),
        new HTMLWebpackPlugin({
            template: './src/team.html',
            chunks: ['team'],
            filename: 'team.html'
        }), 
        new HTMLWebpackPlugin({
            template: './src/nav.html',
            filename: 'nav.html'
        }),
        new HTMLWebpackPlugin({
            template: './src/pages/klassmen.html',
            filename: './pages/klassmen.html'
        }),
        new HTMLWebpackPlugin({
            template: './src/pages/home.html',
            filename: './pages/home.html'
        }), 
        new HTMLWebpackPlugin({
            template: './src/pages/saved.html',
            filename: './pages/saved.html'
        }),
        new CopyWebpackPlugin({
        patterns: [
        { from: "./src/manifest.json", to: "./manifest.json" },
        { from: "./src/img/icons", to: "./img/icons" },
        { from: "./src/serviceWorker.js", to: "./serviceWorker.js" },
      ],
    }),
    ]
}