import {UserRepositoryInterface} from '@/repositories/interfaces/user_repository_interface'
import {User} from '@prisma/client'
import {hash} from 'bcrypt'
import {UserAlreadyExistsError} from './error/user_already_exists_error'

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
  }
  interface RegisterUseCaseResponse {
    user: User;
  }

export class RegisterUserUseCase {
    constructor(private userRepository: UserRepositoryInterface) {}

    async execute({name,email,password}:  RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const hashedPassword = await hash(password, 6)

        const userAlreadyExists = await this.userRepository.findUserByEmail(email)
        if(userAlreadyExists){
            throw new UserAlreadyExistsError()
        }
        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword
        })

        return {user}
    }
}