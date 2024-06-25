import {PasswordRepository} from '@/repositories/passwords/password_repository'
import {UserRepository} from '@/repositories/users/user_repository'
import {GetPasswordUserUseCase} from '@/use-cases/get_passwords_user'

export function makePasswordUserUseCase() {
  const passwordRepository = new PasswordRepository()
  const userRepository = new UserRepository()
  return new GetPasswordUserUseCase(userRepository,passwordRepository)
}
