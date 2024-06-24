import {fastify} from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import 'dotenv/config'

export const app = fastify({logger: true})

app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string
})

app.get('/', async (request, reply) => {
    return {hello: 'world'}
})