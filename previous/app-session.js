const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();

process.env.TZ ="Europe/Paris"

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: 'express-id',
    secret: 'truc',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000 // 24 hours
    }
}));

app.get('/', (req, res) => {
    //console.log(req.session)
    console.log(req.session.id)

    req.session.views = req.session.views ? req.session.views + 1 : 1;
    console.log(req.session.views)

    res.render('index'); 
})

app.listen(3000);
