const express = require('express');
const app = express();
const multer = require('multer');


app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage });

app.get('/upload-multi-form', (req, res) => {
    return res.render('multi-form');
});

// app.post('/upload-file-multi', upload.fields([
//     { name: 'profile', maxCount: 4 },
//     { name: 'resume', maxCount: 1 },
//     { name: 'report', maxCount: 1 }
// ]),
//     (req, res) => {
//         console.log('save');
//         return res.send("File uploaded successfully!");
//     });

// app.post('/upload-file-multi', upload.fields([{ name: 'profile', maxCount: 4 }, { name: 'resume', maxCount: 1 }, { name: 'report', maxCount: 1 }]),
//     (req, res) => { console.log('save'); return res.send("File uploaded successfully!"); });


app.post('/upload-file-multi',
    upload.fields(
        [
            { name: 'profile', maxCount: 4 },
            { name: 'resume', maxCount: 1 },
            { name: 'report', maxCount: 1 }
        ]
    ),
    (req, res) => {
        console.log('save');
        return res.send("File uploaded successfully!");
    }
);


app.get('/', (req, res) => {
    return res.status(200).redirect('/single-file');
})
app.get('/single-file', (req, res) => {
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