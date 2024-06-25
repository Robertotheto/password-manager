import {FastifyInstance} from 'fastify'
import {verifyJwt} from '@/http/middlewares/verify_jwt'
import {createPasswordController} from './create_password_controller'
import {getPasswordUserController} from './get_password_user_controller'

export async function passwordRoutes(app: FastifyInstance){
    app.addHook('onRequest', verifyJwt)
    app.post('/create', createPasswordController)
    app.get('/get-passwords', getPasswordUserController)
}