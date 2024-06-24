import {FastifyRequest, FastifyReply} from 'fastify'
import {makeGetProfileUseCase} from '@/use-cases/factories/make_get_profile_use_case'
import {ResourceNotFoundError} from '@/use-cases/error/resource_not_found_error'

export async function profileUserController(request: FastifyRequest, reply: FastifyReply){
    try {
        const getProfileUseCase = makeGetProfileUseCase()
        const {user} = await getProfileUseCase.execute({
            userId: request.user.sub
        })
        return reply.status(200).send({
            user: {
                ...user,
                password: undefined
            }
        })
    } catch (error) {
        if (error instanceof ResourceNotFoundError){
            reply.status(404).send({message: error.message})
        }
        throw error
    }
}
