import {UserRepositoryInterface} from '@/repositories/interfaces/user_repository_interface'
import {PasswordRepositoryInterface} from '@/repositories/interfaces/password_repository_interface'
import {Password} from '@prisma/client'
import {ResourceNotFoundError} from './error/resource_not_found_error'
import {decrypt} from '@/utils/create_crypto'

interface GetPasswordUserUseCaseRequest {
    userId: string;
  }
  interface GetPasswordUserUseCaseResponse {
      passwords: Password[];
  }

export class GetPasswordUserUseCase {
    constructor(private userRepository: UserRepositoryInterface,
      private passwordRepository: PasswordRepositoryInterface) {}
  
    async execute({userId}: GetPasswordUserUseCaseRequest): Promise<GetPasswordUserUseCaseResponse> {
        const withUser = await this.userRepository.findUserById(userId)
        if (!withUser) {
          throw new ResourceNotFoundError();
        }
        const passwords = await this.passwordRepository.findPasswordUserMany(userId)
        const decryptedPasswords = passwords.map(password => ({
          ...password,
          password: decrypt(password.password),
        }));
        return {passwords: decryptedPasswords}
    }
  }