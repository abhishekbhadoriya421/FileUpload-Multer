const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');
const path = require('path');


app.set('view engine', 'ejs');
/**
 * Configure Storage take desination where will the file uploads and file name by which file will be saved 
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = path.join(__dirname + '/uploads');
        // if folder does not exist then create the folder
        if (!fs.existsSync(folderPath)) {
            fs.mkdir(folderPath, { resursive: true }, (err) => {
                if (err) {
                    throw err;
                }
                console.log('Folder Is Created Successfully');
            });
        }
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})


/**
 * Validate File
 */

const fileFilter = (req, file, cb) => {
    if (req.url === '/upload-file' && file.fieldname === 'profile') {
        const fileExtension = path.extname(file.originalname);
        if (fileExtension === '.jpg' || fileExtension === '.png' || fileExtension === '.jpeg') {
            cb(null, true);
        } else {
            cb("Invalid File Uploaded", false);
        }
    } else {
        cb(null, true);
    }
}

const upload = multer({ storage, fileFilter });
/**
 * Upload Single File Only
 */
app.get('/', (req, res) => {
    return res.status(200).redirect('/single-file');
})
app.get('/single-file', (req, res) => {
    return res.render('Form');
});

app.post('/upload-file', upload.single("profile"), (req, res) => {
    res.send("File uploaded successfully!");
});

/**
 * Upload Multiple files with same name type
 */
app.post('/upload-file-with-name', upload.array("profile", 5), (req, res) => {
    res.send("File uploaded successfully!");
});

/**
 * Upload Multiple Files With Different Name 
 */
app.get('/upload-multi-form', (req, res) => {
    return res.render('multi-form');
});

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

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Handle Multer errors
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).send("Too many files uploaded for one field!");
        }
        return res.status(400).send(err.message);
    } else if (err) {
        // Other errors
        return res.status(500).send(err);
    }
    next();
});

app.listen(8080, (err) => {
    if (!err) {
        console.log('Server Is Running');
    } else {
        console.log('err');
    }
});