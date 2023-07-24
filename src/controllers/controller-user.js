import { RepoUsers } from "../repository/repo-user.js";
import { DaoMDBUser } from "../persistence/daos/mdb/dao-mdb-user.js";
const userDao = new DaoMDBUser()
const svcUser = new RepoUsers()

export class ControllerUsers {
    constructor() { }

    async registerResponse(req, res, next) {
        try {
            res.redirect('/views/register-ok')
        } catch (err) { next(err) }
    }

    async loginResponse(req, res, next) {
        try {
            const user = await userDao.getUserById(req.session.passport.user)
            const {firstname, lastname, email, age, role, access} = user
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
            const {firstname, lastname, email, age, role, access} = req.user
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

    async createUserCtrl(req, res, next) {
        try {
            const newDoc = req.body
            const newDocPost = await svcUser.createUserSvc(newDoc)
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
            const user = await svcUser.loginUserSvc(credentials)
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
}