const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('signthecookie'));

app.get('/', (req, res) => {
    //res.cookie('key', '456');
    //console.log(req.headers.cookie);

    //res.cookie('keySecret', 'qqq', {
        //domain: 'domain.com',
        //path: '/admin',
        //httpOnly: true,
        //secure: true
    //})
    res.cookie('signed-cookie', 'clear value', {
        signed: true
    })

    //res.clearCookie('key');
    console.log(req.cookies); 
    console.log(req.signedCookies); 

    res.render('index');
})


app.listen(3000);
