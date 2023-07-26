import { Router } from 'express'
import { ControllerUsers } from '../controllers/controller-user.js'
import passport from 'passport'

const ctrlUser = new ControllerUsers();
const router = Router();

router.post('/register', passport.authenticate('register',{failureRedirect:'/views/register-err'}), ctrlUser.registerResponse)
router.post('/login', passport.authenticate('login',{failureRedirect:'/views/login-err'}), ctrlUser.loginResponse)
router.get('/github', passport.authenticate('github',{scope:['user:email']}))
router.get('/github-ok', passport.authenticate('github',{failureRedirect:'/views/login-err'}), ctrlUser.githubResponse)
// router.delete('/logout', ctrlUser.logOutUserResponse)

export default router;