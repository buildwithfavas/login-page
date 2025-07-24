const express = require('express');
const user = express.Router();

const userName = "admin";
const password = "admin@123";

// --- Middleware ---

function checkAuth(req, res, next) {
    if(req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
}

function checkGuest(req, res, next) {
    if(req.session.user){
        res.redirect('/home');
    }else{
        next();
    }
}

function validateLoginInput(req, res ,next){
    const {username, password} = req.body;
    if(!username || !password){
        return res.render('login',{msg:"Username and Password are required"});
    }
    next();
}

// --- Routes ---

user.get('/', checkGuest, (req, res) => {
    const msg = req.session.msg || null;
    req.session.msg = null;
    res.render('login', {msg});
});

user.post('/verify', validateLoginInput, (req, res) => {
    const {username, password: pwd} = req.body;

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