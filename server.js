'use strict'

const path = require('path'),
      express = require('express'),
      compression = require('compression'),
      isDeveloping = process.env.NODE_ENV !== 'production',
      port = isDeveloping ? 3000 : process.env.PORT,
      MongoClient = require('mongodb').MongoClient,
      assert = require('assert')

const url = isDeveloping ? 'mongodb://mongo:27017' : process.env.MONGO_URL

const app = express()
app.use(compression())

app.use(require('body-parser').json())

require('./api')(app, url, MongoClient, assert)

if (isDeveloping) {
  const webpack = require('webpack');
  const config = require('./config/webpack.common.js');
  config.mode = 'development'
  const compiler = webpack(config);
  const isObject = require('is-object');
  const middleware = require('webpack-dev-middleware');
  
  // This function makes server rendering of asset references consistent with different webpack chunk/entry configurations
  const normalizeAssets = (assets) => {
    if (isObject(assets)) {
      return Object.values(assets);
    }
  
    return Array.isArray(assets) ? assets : [assets];
  }
  
  app.use(middleware(compiler, { serverSideRender: false }));
  
  // The following middleware would not be invoked until the latest build is finished.
  app.get('*', (req, res) => {
    const { devMiddleware } = res.locals.webpack;
    const outputFileSystem = devMiddleware.outputFileSystem;
    const jsonWebpackStats = devMiddleware.stats.toJson();
    const { assetsByChunkName, outputPath } = jsonWebpackStats;
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