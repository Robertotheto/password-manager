import { Password, Prisma} from '@prisma/client'
import {prisma} from '@/lib/prisma'
import {PasswordRepositoryInterface} from '../interfaces/password_repository_interface'

export class PasswordRepository implements PasswordRepositoryInterface{
    async create(data: Prisma.PasswordCreateInput) {
        const password = await prisma.password.create({data})
        return password
    }
    async findPasswordUserMany(userId: string) {
        const passwords = await prisma.password.findMany({
            where: {
                userId
            }
        })
        return passwords
    }
}