import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getUsers(): User[] {
        return this.usersService.findAll();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number): User {
        return this.usersService.findById(id)
    }

    @Post()
    createUser(@Body() body: CreateUserDTO): User {
        return this.usersService.createUser(body);
    }
}
