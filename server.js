'use strict';
require('dotenv').config();
const express = require('express');
const server = express();
const db = require('./database/db');
const cors = require('cors');
const port = 3000;

db.on('connected', () => {
    server.listen(port, () => console.log(`Example app listening on port ${port}!`));
    console.log('wee');
}
);


const passport = require('./utils/pass');
const authRoute = require('./routes/authRoute');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
server.use(cors());
server.use(express.urlencoded({extended: true}));
server.use(express.json());
server.use('/auth', authRoute);
server.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
server.use('/user',passport.authenticate('jwt', {session: false}), userRoute);




