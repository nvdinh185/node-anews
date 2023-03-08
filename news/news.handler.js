const sqlite3 = require('sqlite3').verbose();
const dbFile = './database/news.db';
const db = new sqlite3.Database(dbFile);

db.serialize();

module.exports = {
    getListNews,
    getListNewsByCat,
    getNewsDetail,
    getCategories,
    postContact
}

async function getListNews() {
    const listNews = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM news`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
    return listNews;
}

async function getListNewsByCat(query) {
    const listNewsByCat = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM news WHERE cat_id = ${query.cId}`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
    return listNewsByCat;
}

async function getNewsDetail(query) {
    const newsDetail = await new Promise((resolve, reject) => {
        db.each(`SELECT * FROM news WHERE id = ${query.dId}`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
    return newsDetail;
}

async function getCategories() {
    const listCats = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM categories`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
    return listCats;
}

async function postContact(contact) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO contacts (name, phone, web, gender, picture, content) VALUES (?, ?, ?, ?, ?, ?)`,
            [contact.name, contact.phone, contact.web,
            contact.gender, contact.file, contact.content], function (err) {
                if (err) {
                    reject(new Error(err.message));
                }
                resolve(this.changes);
            });
    })
}