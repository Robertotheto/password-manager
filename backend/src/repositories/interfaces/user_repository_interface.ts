import {User, Prisma} from '@prisma/client'

export interface UserRepositoryInterface {
    create(data: Prisma.UserCreateInput): Promise<User>
    findUserById(id: string): Promise<User | null>
    findUserByEmail(email: string): Promise<User | null>
}