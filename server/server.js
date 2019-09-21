const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpack = require('webpack');
const config = require(`../webpack.config`);
var compiler = webpack(config);
const path = require('path');

const app = express();
// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
// app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let todoList = {};

app.get('/api/user', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

var Routes = require('./routes/appRoutes');
new Routes(app);


app.listen(3001, () =>
  console.error('Express server is running on localhost:3001')
);