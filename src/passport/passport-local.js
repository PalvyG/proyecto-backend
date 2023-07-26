import passport from 'passport';
import { Strategy as LocalStrat } from 'passport-local';
import { DaoMDBUser } from '../persistence/daos/mdb/dao-mdb-user.js';
const userDao = new DaoMDBUser();

const stratOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

const register = async (req, email, password, done) => {
    try {
        const findUser = await userDao.getUserByEmail(email);
        if (findUser) {
            return done(null, false);
        } else {
            const newUser = await userDao.createUser(req.body);
            return done(null, newUser);
        }
    } catch (err) { console.log(err) }
}

const login = async (req, email, password, done) => {
    try {
        const user = {email, password}
        const loginUser = await userDao.loginUser(user)
        return done(null, loginUser)
    } catch (err) { console.log(err) }
}

const registerStrat = new LocalStrat(stratOptions, register)
const loginStrat = new LocalStrat(stratOptions, login)

passport.use('register', registerStrat)
passport.use('login', loginStrat)

passport.serializeUser(async (user, done)=>{
    const usr = await userDao.getUserById(user._id)
    done(null, usr._id);
});

passport.deserializeUser(async(id, done)=>{
    const user = await userDao.getUserById(id);
    return done(null, user);
});
