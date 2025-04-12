const session = require('express-session');
const MongoStore = require('connect-mongo');
const { app } = require('../app');


app.use(session({ 
    name: 'express-id',
    secret: 'truc',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 * 1000 // ms 7 days
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL_CONNECTION,
        ttl: 60 * 60 * 24 * 7 // sec 7 days
    })
}));