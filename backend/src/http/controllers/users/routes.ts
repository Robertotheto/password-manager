import {FastifyInstance} from 'fastify'
import {registerUserController} from './register_user_controller'
import {authenticateUserController} from './authenticate_user_controller'

export async function userRoutes(app: FastifyInstance){
    app.post('/create', registerUserController)
    app.post('/login', authenticateUserController)
}