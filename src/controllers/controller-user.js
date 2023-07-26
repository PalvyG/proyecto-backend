import { ControllerBase } from './controller-base.js'
import { RepoUser } from "../repository/repo-user.js";
import factory from '../persistence/factory.js';
const { daoUser } = factory;
import { DtoUser } from '../persistence/daos/mdb/dtos/dto-user.js';
const repoUser = new RepoUser()

export class ControllerUsers extends ControllerBase {
    constructor() {
        super(repoUser)
    }

    async getUserDtoResponse(req, res, next) {
        try {
            const isLoggedIn = req.session.passport
            if (!isLoggedIn) {
                res.render('profile')
            } else {
                const user = await daoUser.getUserById(req.session.passport.user)
                const { ...userDTO } = new DtoUser(user)
                req.session.userDTO = userDTO
                res.render('profile')
            }
        } catch (err) { next(err) }
    }

    async registerResponse(req, res, next) {
        try {
            res.redirect('/views/register-ok')
        } catch (err) { next(err) }
    }

    async loginResponse(req, res, next) {
        try {
            const user = await daoUser.getUserById(req.session.passport.user)
            const { firstname, lastname, email, age, role, access } = user
            req.session.user = {
                firstname,
                lastname,
                email,
                age,
                role,
                access
            }
            res.redirect('/views/login-ok')
        } catch (err) { next(err) }
    }

    async githubResponse(req, res, next) {
        try {
            const { firstname, lastname, email, age, role, access } = req.user
            req.session.user = {
                firstname,
                lastname,
                email,
                age,
                role,
                access
            }
            res.redirect('/views/login-ok')
        } catch (err) { next(err) }
    }

    // async logOutUserResponse(req, res, next) {
    //     try {
    //         req.logout(function (err) {
    //             if (err) { return next(err); }
    //             res.redirect('/');
    //         });
    //     } catch (err) { next(err) }
    // }

    async createUserCtrl(req, res, next) {
        try {
            const newDoc = req.body
            const newDocPost = await repoUser.createUserSvc(newDoc)
            if (newDocPost) {
                res.redirect('/views/register-ok')
            } else {
                res.redirect('/views/register-err')
            }
        } catch (err) { next(err) }
    }

    async loginUserCtrl(req, res, next) {
        try {
            const credentials = req.body
            const user = await repoUser.loginUserSvc(credentials)
            if (user) {
                req.session.email = credentials.email
                req.session.password = credentials.password
                req.session.firstname = user.firstname
                res.redirect('/views/login-ok')
            } else {
                res.redirect('/views/login-err')
            }
        } catch (err) { next(err) }
    }

    async getUserDtoCtrl(req, res, next) {
        try {
            const isLoggedIn = req.session.passport
            if (!isLoggedIn) {
                res.status(400).json({message: '(!) You must be logged in to see your profile.'})
            } else {
                const user = await daoUser.getUserById(req.session.passport.user)
                const { ...userDTO } = new DtoUser(user)
                req.session.userDTO = userDTO
                res.status(200).json({message: '(i) Profile:', profile: userDTO})
            }
        } catch (err) { next(err) }
    }
}