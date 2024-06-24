import {FastifyRequest, FastifyReply} from 'fastify'
import {makeRegisterUserUseCase} from '@/use-cases/factories/make_register_user_use_case'
import {UserAlreadyExistsError} from '@/use-cases/error/user_already_exists_error'
import {z} from 'zod'

export async function registerUserController(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6)
    })
    const {name,email,password} = registerBodySchema.parse(request.body)
    try {
        const registerUserUseCase = makeRegisterUserUseCase()
        await registerUserUseCase.execute({name,email,password})
    } catch (error) {
        if (error instanceof UserAlreadyExistsError){
            reply.status(409).send({message: error.message})
        }
        throw error
    }
    return reply.status(201).send()
}