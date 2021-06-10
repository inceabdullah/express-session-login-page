const conf = require("./config.json");
const express = require("express");
const session = require('express-session');
const morgan = require("morgan")
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('combined'))
app.use(cors());
app.use(session({
    secret: conf.secret,
    resave: false,
    saveUninitialized: true
  }));

app.use(function (req, res, next) {
    if (req.originalUrl === "/login") return next();
    if (req.session.confirmed !== true && req.originalUrl === "/") return res.redirect(301, '/login-page.html');
    return next();
});

app.use(express.static('out'));

app.post('/login', function (req, res) {
    if (req.body.password === conf.password) {
        req.session.confirmed = true;

        return res.json({login: true});
    } else {
        return res.status(403).json({login: false});
    }
});

app.listen(port=8080, host="0.0.0.0", ()=> {
    console.log("running on the port", port, "in the host", host, "http://" + host + ":" + port);
});
