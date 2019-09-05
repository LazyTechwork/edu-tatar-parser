// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  entry: "./resources/js/main.js",
  output: {
    path: __dirname + "/public",
    filename: "main.js"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // это будет применяться к файлам `.js`
      // А ТАКЖЕ к секциям `<script>` внутри файлов `.vue`
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      // это будет применяться к файлам `.css`
      // А ТАКЖЕ к секциям `<style>` внутри файлов `.vue`
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // убедитесь что подключили плагин!
    new VueLoaderPlugin()
  ]
}