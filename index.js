const express = require('express');
const app = express()

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    return res.render('Form');
});

app.post('/upload-file', (req, res) => {
    console.log(req);
});

app.listen(8080, (err) => {
    if (!err) {
        console.log('Server Is Running');
    } else {
        console.log('err');
    }
});