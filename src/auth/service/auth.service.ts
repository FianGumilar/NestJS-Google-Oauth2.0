import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { UserDetails } from '../utils/types';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async validateUser(details: UserDetails) {
        console.log('AuthService')
        console.log(details)
        const user = await this.userRepository.findOneBy({ email: details.email})
        console.log(user);
        if(user) return user;
        else {
            console.log('User not found!')
        }
        const newUser = await this.userRepository.create(details);
        return this.userRepository.save(newUser);
    }

    async findUser(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        return user;
    }
}
