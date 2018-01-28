'use strict';

const path = require('path');
const express = require('express');
const port = process.env.port || process.env.PORT || 3000;

const app = express();
app.use('/static/', express.static(__dirname + "/static"));

app.use(express.static(__dirname + '/dist'));

app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index-prod.html'));
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});