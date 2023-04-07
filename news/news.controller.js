const express = require('express');
const router = express.Router();

const newsHandler = require('./news.handler');
const newsMiddleware = require('./news.middleware');

// routes
router.get('/list-news', newsHandler.getListNews);
router.get('/list-news-by-cat', newsHandler.getListNewsByCat);
router.get('/detail', newsHandler.getNewsDetail);
router.get('/cats', newsHandler.getCategories);

router.post('/save-contact', newsMiddleware.uploadFile, newsHandler.postContact);

module.exports = router;