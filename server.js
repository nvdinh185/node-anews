const express = require('express');
const path = require('path');
const app = express();
const errorHandler = require('./_helpers/error-handler');

const publicPath = path.join(__dirname, "client");
app.use(express.static(publicPath));

// api routes
app.use('/news', require('./news/news.controller'));

// global error handler
app.use(errorHandler);

app.get('/', function (req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is starting on port ${port}...`));