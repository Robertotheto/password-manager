import {UserRepository} from '@/repositories/users/user_repository'
import {AuthenticateUserUseCase} from '@/use-cases/authenticate_user'

export function makeAuthenticateUserUseCase(){
    const userRepository = new UserRepository()
    return new AuthenticateUserUseCase(userRepository)
}