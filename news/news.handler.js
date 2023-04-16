const sqlite3 = require('sqlite3').verbose();
const dbFile = './database/news.db';

module.exports = {
    getListNews,
    getListNewsByCat,
    getNewsDetail,
    getCategories,
    postContact
}

async function getListNews(req, res, next) {
    try {
        var db = new sqlite3.Database(dbFile);
        db.serialize();
        const listNews = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM news`, (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        })
        res.json(listNews);
    } catch (err) {
        next(err);
    } finally {
        db.close();
    }
}

async function getListNewsByCat(req, res, next) {
    var query = req.query;
    try {
        var db = new sqlite3.Database(dbFile);
        db.serialize();
        const listNewsByCat = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM news WHERE cat_id = ${query.cId}`, (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        })
        res.json(listNewsByCat);
    } catch (err) {
        next(err);
    } finally {
        db.close();
    }
}

async function getNewsDetail(req, res, next) {
    var query = req.query;
    try {
        var db = new sqlite3.Database(dbFile);
        db.serialize();
        const newsDetail = await new Promise((resolve, reject) => {
            db.each(`SELECT * FROM news WHERE id = ${query.dId}`, (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        })
        res.json(newsDetail);
    } catch (err) {
        next(err);
    } finally {
        db.close();
    }
}

async function getCategories(req, res, next) {
    try {
        var db = new sqlite3.Database(dbFile);
        db.serialize();
        const listCats = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM categories`, (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        })
        res.json(listCats);
    } catch (err) {
        next(err);
    } finally {
        db.close();
    }
}

async function postContact(req, res, next) {
    var formData = req.form_data;
    try {
        var db = new sqlite3.Database(dbFile);
        db.serialize();
        var result = await new Promise((resolve, reject) => {
            db.run(`INSERT INTO contacts (name, phone, web, gender, picture, content) VALUES (?, ?, ?, ?, ?, ?)`,
                [formData.name, formData.phone, formData.web,
                formData.gender, formData.file, formData.content], function (err) {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve(this.changes);
                });
        })
        res.json(result);
    } catch (err) {
        next(err);
    } finally {
        db.close();
    }
}