const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const router = require('./router');
const passport = require('passport');
const expressSession = require('express-session');
const { initializingPassport } = require('./passportConfig');
require('dotenv').config();
require('./db/mongoose');
const port = process.env.PORT
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(expressSession({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(router);
app.use(passport.initialize());
app.use(passport.session());

initializingPassport(passport);

app.listen(port, () => {
    console.log('Server is listening on port ' , port);
})