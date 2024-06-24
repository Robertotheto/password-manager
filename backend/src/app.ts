import {fastify} from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import {userRoutes} from '@/http/controllers/users/routes'
import { ZodError } from "zod";
import 'dotenv/config'

export const app = fastify({logger: true})

app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string,
    sign: { expiresIn: "10m" },
})

app.register(userRoutes, {prefix: '/users'})

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
      return reply
        .status(400)
        .send({ message: "Validation error", issues: error.format() });
    }
    return reply.status(500).send({ message: "Internal server error" });
  });