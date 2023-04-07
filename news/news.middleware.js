const formidable = require('formidable');
const fs = require('fs');
const systempath = require('path');

module.exports = {
    uploadFile
}

function uploadFile(req, res, next) {
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
                await new Promise((resolve, reject) => {
                    fs.rename(oldpath, newpath, err => {
                        if (err) {
                            reject("Error..." + err);
                        } else {
                            resolve('OK');
                        }
                    });
                })

                formData[key] = filenameStored;
            } else {
                formData[key] = '';
            }
            // console.log(formData);
            req.form_data = formData;
            next();
        }
    })
}