import {Password, Prisma} from '@prisma/client'

export interface PasswordRepositoryInterface {
    create(data: Prisma.PasswordCreateInput): Promise<Password>
    findPasswordUserMany(userId: string): Promise<Password[]>
}