const express = require('express');
const app = express();
const multer = require('multer');


app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/');
    },
    filename: (req, file, cb) => {
        cb(null, 'abhishek-ki-file' + Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage });

app.get('/', (req, res) => {
    return res.render('Form');
});


app.post('/upload-file', upload.single("profile"), (req, res) => {
    console.log(req.file);
    res.send("File uploaded successfully!");
});

app.listen(8080, (err) => {
    if (!err) {
        console.log('Server Is Running');
    } else {
        console.log('err');
    }
});