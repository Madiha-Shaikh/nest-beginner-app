import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [{id: 0, name: "abc"}, {id: 1, name: "bcd"}, {id: 2, name: "cde"}];
    findAll() {
        return this.users;
    }

    findById(id: number): User {
        const user = this.users.find((user) => user.id === id);
        if(!user) {
            throw new NotFoundException();
        }
        return user;
    }

    createUser(createUserDTO: CreateUserDTO): User {
        const newUser = {id: Date.now(), ...createUserDTO};
        this.users.push(newUser);
        return newUser;
    }
}
