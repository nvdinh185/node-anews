const express = require('express');
const router = express.Router();
const newsHandler = require('./news.handler');

// routes
router.get('/list-news', getListNews);
router.post('/save-contact', postContact);

module.exports = router;

function getListNews(req, res, next) {
    newsHandler.getListNews()
        .then(listNews => res.json(listNews))
        .catch(err => next(err));
}

function postContact(req, res, next) {
    newsHandler.postContact(req.body)
        .then(result => res.json(result))
        .catch(err => next(err));
}