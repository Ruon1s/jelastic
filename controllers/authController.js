'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');

const login = (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: "something is not right",
                user: user,
            });
        }
        req.login(user, {session: false}, (err) => {
            if(err) {
                res.send('error' + err);
            }
            const token = jwt.sign(user, 'your_jwt_secret');
            return res.json({user, token});
        });
    })(req, res);
};

module.exports = {
    login,
};
