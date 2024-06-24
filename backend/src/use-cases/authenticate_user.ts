import {UserRepositoryInterface} from '@/repositories/interfaces/user_repository_interface'
import {User} from '@prisma/client'
import {compare} from 'bcrypt'
import {InvalidCredentialsError} from './error/invalid_credentials_error'

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
  }
  interface AuthenticateUseCaseResponse {
    user: User;
  }

export class AuthenticateUserUseCase {
    constructor(private userRepository: UserRepositoryInterface) {}

    async execute({email,password}:  AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.userRepository.findUserByEmail(email)
        if(!user){
            throw new InvalidCredentialsError()
        }
        const passwordMatch = await compare(password, user.password)
        if(!passwordMatch){
            throw new InvalidCredentialsError()
        }
        return {user}
    }
}