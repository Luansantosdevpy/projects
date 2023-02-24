import { Router } from 'express'
import { UserController } from './controllers/userController'
import { authMiddleware } from './middlewares/authMiddlware'

const router = Router()

router.post('/user', new UserController().create)
router.post('/login', new UserController().login)

router.use(authMiddleware)

router.get('/profile', new UserController().getProfile)

export default router