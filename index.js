const express = require('express');
const app = express()

app.set('view engin', 'ejs');


app.listen(8080, (err) => {
    if (!err) {
        console.log('Server Is Running');
    } else {
        console.log('err');
    }
});