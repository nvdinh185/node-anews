const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const systempath = require('path');

const newsHandler = require('./news.handler');

// routes
router.get('/list-news', getListNews);
router.get('/list-news-by-cat', getListNewsByCat);
router.get('/detail', getNewsDetail);
router.get('/cats', getCategories);

router.post('/save-contact', postContact);

module.exports = router;

function getListNews(req, res, next) {
    newsHandler.getListNews()
        .then(listNews => res.json(listNews))
        .catch(err => next(err));
}

function getListNewsByCat(req, res, next) {
    newsHandler.getListNewsByCat(req.query)
        .then(listNews => res.json(listNews))
        .catch(err => next(err));
}

function getNewsDetail(req, res, next) {
    newsHandler.getNewsDetail(req.query)
        .then(news => res.json(news))
        .catch(err => next(err));
}

function getCategories(req, res, next) {
    newsHandler.getCategories()
        .then(listNews => res.json(listNews))
        .catch(err => next(err));
}

function postContact(req, res, next) {
    const dirUpload = 'upload_files';
    if (!fs.existsSync(dirUpload)) fs.mkdirSync(dirUpload);
    const form = new formidable.IncomingForm();
    form.uploadDir = dirUpload;
    form.parse(req, async (err, fields, files) => {
        var formData = {};
        if (err) {
            res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(JSON.stringify({ message: 'Parse Formdata Error', error: err }));
        } else {
            for (var key in fields) {
                formData[key] = fields[key];
            }
            var isNotEntry = !(Object.entries(files).length === 0 && files.constructor === Object);
            var key = "file";
            if (isNotEntry) {
                //đường dẫn thực file upload lên
                var filenameStored = `${dirUpload}${systempath.sep}${Date.now()}_${files[key].originalFilename}`;

                var oldpath = files[key].filepath;
                var newpath = filenameStored
                //chuyển file từ thư mục temp sang thư mục upload_files
                try {
                    await new Promise((resolve, reject) => {
                        fs.rename(oldpath, newpath, err => {
                            if (err) {
                                reject("Error..." + err);
                            } else {
                                resolve('OK');
                            }
                        });
                    })
                } catch (err) { }

                formData[key] = filenameStored;
            } else {
                formData[key] = '';
            }
            // console.log(formData);
            newsHandler.postContact(formData)
                .then(result => res.json(result))
                .catch(err => next(err));
        }
    })
}