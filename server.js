const express = require('express');
const session = require('express-session');
const nocache = require('nocache');
const userRoute = require('./Routes/user');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

app.use(nocache());
app.use('/', userRoute);

app.use((err, req, res, next) => {
    console.error("Internal Error: ", err.stack);
    res.status(500).send("Something went wrong on the server.");
});

app.listen(3003, () => console.log('Server running on port 3003'));