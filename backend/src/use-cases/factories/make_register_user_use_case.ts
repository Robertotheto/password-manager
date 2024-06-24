import {UserRepository} from '@/repositories/users/user_repository'
import {RegisterUserUseCase} from '../register_user'

export function makeRegisterUserUseCase(){
    const userRepository = new UserRepository()
    return new RegisterUserUseCase(userRepository)
}