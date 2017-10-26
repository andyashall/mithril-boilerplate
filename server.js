'use strict'

const path = require('path'),
      express = require('express'),
      compression = require('compression'),
      isDeveloping = process.env.NODE_ENV !== 'production',
      port = isDeveloping ? 3000 : process.env.PORT,
      MongoClient = require('mongodb').MongoClient,
      assert = require('assert')

const url = isDeveloping ? require("./mongo.conf.js") : process.env.MONGO_URL

const app = express()
app.use(compression())

app.use(require('body-parser').json())

require('./api')(app, url, MongoClient, assert)

if (isDeveloping) {
  const webpack = require('webpack'),
        webpackMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        config = require('./webpack.base.conf.js'),
        compiler = webpack(config),
        middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })
  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
    res.end()
  })
} else {
  app.use(express.static(__dirname + '/dist'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
  }) 
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info(`Listening on port ${port}`)
})