import {FastifyInstance} from 'fastify'
import {verifyJwt} from '@/http/middlewares/verify_jwt'
import {registerUserController} from './register_user_controller'
import {authenticateUserController} from './authenticate_user_controller'
import {profileUserController} from './profile_user_controller'

export async function userRoutes(app: FastifyInstance){
    app.post('/create', registerUserController)
    app.post('/login', authenticateUserController)

    app.get('/profile', {onRequest: [verifyJwt]}, profileUserController)
}