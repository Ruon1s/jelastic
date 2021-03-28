'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const JWTStrategy = require("passport-jwt").Strategy;
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;

// local strategy for username password login
passport.use(new Strategy(
     (username, password, done) => {
        const params = [username];
        console.log('username: ' + username + 'password: ' + password);

        try {
            const user = userModel.getUserLogin(params);
            console.log('Local strategy', user); // result is binary row
            if (user === undefined) {
                console.log('user null');
                return done(null, false, {message: 'Incorrect email.'});
            }
            if (user.password !== password) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
        } catch (err) {
            return done(err);
        }
    }));


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
}, (jwtPayload, done) => {
        return done(null, jwtPayload);
    }
));




module.exports = passport;
