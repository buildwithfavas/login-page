const express = require('express');
const { checkAuth, checkGuest, validateLoginInput } = require('../middleware/middlewares');
const user = express.Router();

const userName = "admin";
const password = "Admin@123";

user.get('/', checkGuest, (req, res) => {
    const msg = req.session.msg || null;
    req.session.msg = null;
    res.render('login', { msg });
});

user.post('/verify', validateLoginInput, (req, res) => {
    const { username, password: pwd } = req.body;
    // console.log("USERNAME:", username);
    // console.log("PASSWORD:", pwd);

    if (username === userName && pwd === password) {

        req.session.user = username;
        res.redirect('/home');
    } else {

        req.session.msg = "Invalid Credentials";
        res.redirect('/');
    }
});

user.get('/home', checkAuth, (req, res) => {
    res.render('home');
});

user.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('login', { msg: "Logged out successfully" });

});

module.exports = user;