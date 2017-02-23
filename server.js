/* eslint no-console: 0 */

/**
 * What does this serve do?
 * 1. Routing -> distribute the request to specific function.
 * 2. Authentication -> verify users
 * 3. Staict Assets Storage -> storage functionality, image, code and data
 */

const path = require('path'); // help to locate the file location in different operating systems
const express = require('express'); // a basic, simple server, we will build our own custom server based on it
const webpack = require('webpack'); // Compress all .js files into one .js file, reduce the size of file -> reduce the 流量, 网页加载更快
const webpackMiddleware = require('webpack-dev-middleware'); // hot replace, development helper
const webpackHotMiddleware = require('webpack-hot-middleware'); // hot replace, development helper

const config = require('./webpack.config.js'); // webpack configuraion file, written on our own
const api = require('./apis/api.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
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
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

// Routing
app.use('/api', api);

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
