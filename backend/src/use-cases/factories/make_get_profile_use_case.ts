import {UserRepository} from '@/repositories/users/user_repository'
import {GetUserProfileUseCase} from '@/use-cases/get_user_profile'

export function makeGetProfileUseCase() {
  const userRepository = new UserRepository()
  return new GetUserProfileUseCase(userRepository)
}