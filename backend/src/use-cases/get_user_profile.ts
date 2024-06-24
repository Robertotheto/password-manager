import {UserRepositoryInterface} from '@/repositories/interfaces/user_repository_interface'
import {User} from '@prisma/client'
import {ResourceNotFoundError} from './error/resource_not_found_error'

interface GetUserProfileUseCaseRequest {
    userId: string;
  }
  interface GetUserProfileUseCaseResponse {
    user: User;
  }

export class GetUserProfileUseCase {
    constructor(private userRepository: UserRepositoryInterface) {}
  
    async execute({userId}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        throw new ResourceNotFoundError();
      }
      return { user };
    }
  }