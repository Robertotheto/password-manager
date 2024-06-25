import {Password} from '@prisma/client'
import {PasswordRepositoryInterface} from '@/repositories/interfaces/password_repository_interface'
import {UserRepositoryInterface} from '@/repositories/interfaces/user_repository_interface'
import { ResourceNotFoundError } from './error/resource_not_found_error';
import {encrypt} from '@/utils/create_crypto'

interface CreatePasswordUseCaseRequest {
    title: string;
    login: string;
    password: string;
    userId: string;
  }
  interface CreateGymsUseCaseResponse {
    passwords: Password;
  }

export class CreatePasswordUseCase {
    constructor(
      private passwordRepository: PasswordRepositoryInterface, 
      private userRepository: UserRepositoryInterface) {}

    async execute({title,login,password, userId}: CreatePasswordUseCaseRequest): Promise<CreateGymsUseCaseResponse> {
        const withUser = await this.userRepository.findUserById(userId)
        if (!withUser) {
          throw new ResourceNotFoundError();
        }
        const encryptedPassword = encrypt(password)
        const newPassword = await this.passwordRepository.create({
            title,
            login,
            password: encryptedPassword,
            user: { connect: { id: withUser.id } }
        })
        return {passwords: newPassword}
    }
}