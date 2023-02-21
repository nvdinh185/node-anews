const sqlite3 = require('sqlite3').verbose();
const dbFile = './database/news.db';
const db = new sqlite3.Database(dbFile);

db.serialize();

module.exports = {
    getListNews,
    postContact
};

async function getListNews() {
    const listNews = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM news`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
    return listNews;
}

async function postContact(contact) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO contacts (name, phone, web, gender, picture, content) VALUES (?, ?, ?, ?, ?, ?)`,
            [contact.name, contact.phone, contact.web,
            contact.gender, contact.picture, contact.content], function (err) {
                if (err) {
                    // console.error(`Lỗi ${err.message}`);
                    reject(new Error(err.message));
                }
                // console.log(`this.changes: ${this.changes}`);
                resolve(this.changes);
            });
    })
}