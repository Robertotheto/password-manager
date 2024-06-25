import {FastifyRequest, FastifyReply} from 'fastify'
import {makeCreatePasswordUseCase} from '@/use-cases/factories/make_create_password_use_case'
import {ResourceNotFoundError} from '@/use-cases/error/resource_not_found_error'
import {z} from 'zod'

export async function createPasswordController(request: FastifyRequest, reply: FastifyReply){
    const createBodySchema = z.object({
        title: z.string(),
        login: z.string(),
        password: z.string()
    })
    const {login,title,password} = createBodySchema.parse(request.body)
    
    try {
        const createPasswordUseCase = makeCreatePasswordUseCase()
        await createPasswordUseCase.execute({
            title,
            login,
            password,
            userId: request.user.sub
        })
        return reply.status(201).send()
    } catch (error) {
        if (error instanceof ResourceNotFoundError){
            reply.status(404).send({message: error.message})
        }
        throw error
    }
}