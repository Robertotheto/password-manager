import {PasswordRepository} from '@/repositories/passwords/password_repository'
import {UserRepository} from '@/repositories/users/user_repository'
import {CreatePasswordUseCase} from '@/use-cases/create_password'

export function makeCreatePasswordUseCase() {
  const passwordRepository = new PasswordRepository()
  const userRepository = new UserRepository()
  return new CreatePasswordUseCase(passwordRepository, userRepository)
}
