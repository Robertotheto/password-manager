import {FastifyRequest, FastifyReply} from 'fastify'
import {makePasswordUserUseCase} from '@/use-cases/factories/make_password_user_use_case'
import {ResourceNotFoundError} from '@/use-cases/error/resource_not_found_error'

export async function getPasswordUserController(request: FastifyRequest, reply: FastifyReply){
    try {
        const getPasswordUserUseCase = makePasswordUserUseCase()
        const passwords = await getPasswordUserUseCase.execute({
            userId: request.user.sub
        })
        return reply.status(200).send(passwords)
    } catch (error) {
        if (error instanceof ResourceNotFoundError){
            reply.status(404).send({message: error.message})
        }
        throw error
    }
}