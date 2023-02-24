import { Router } from 'express'
import { ProjectController } from './controllers/projectController'
import { UserController } from './controllers/userController'
import { authMiddleware } from './middlewares/authMiddlware'

export default async (): Promise<Router> => {
    const projectController = new ProjectController()
    const userController = new UserController()
    const router = Router()

    router.post('/user', userController.create)
    router.post('/login', userController.login)
    router.get('/projects', projectController.projects)
    router.get('/project/:id', projectController.project)
    router.post('/project', projectController.create)
    
    router.use(authMiddleware)
    
    router.get('/profile', new UserController().getProfile)

    return router
}


