import {FastifyRequest, FastifyReply} from 'fastify'
import {makeAuthenticateUserUseCase} from '@/use-cases/factories/make_authenticate_user_use_case'
import {InvalidCredentialsError} from '@/use-cases/error/invalid_credentials_error'
import {z} from 'zod'

export async function authenticateUserController(request: FastifyRequest, reply: FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string(),
        password: z.string().min(6)
    })
    const {email,password} = authenticateBodySchema.parse(request.body)
    try {
        const authenticateUserUseCase = makeAuthenticateUserUseCase()
        const {user} = await authenticateUserUseCase.execute({email,password})
        const token = await reply.jwtSign({sub: user.id})
        return reply.status(200).send({token})
    } catch (error) {
        if (error instanceof InvalidCredentialsError){
            reply.status(400).send({message: error.message})
        }
        throw error
    }
}