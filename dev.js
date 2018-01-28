const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const port = 3000;

const config = require('./webpack.config.js');
const app = express();
const webpack = require('webpack');
const opn = require('opn');

app.use('/static/', express.static(__dirname + "/static"));

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: config.output.publicPath,
  quiet: false,
  colors: true,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(middleware);

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

middleware.waitUntilValid(() => {
  opn("http://localhost:3000");
})

app.use(express.static(__dirname + '/dist'));

app.get("*", function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});