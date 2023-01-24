 '@nestjs/common';
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { UserValidationService } from './uservalidation.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService, private userValidationService:UserValidationService) {}

    @Get()
    async findAll(): Promise<UserDTO[]> {
        const users = await this.userService.findAll();
        return users.map(user => new UserDTO(user));
    }

    @Post()
    async create(@Body() user: UserDTO) {
        try{
            await this.userValidationService.validateCreate(user)
            const createdUser = await this.userService.create(user);
            return new UserDTO(createdUser);
        }catch(error){
            console.log(error);
            return error
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: UserDTO) {
        try{
            const updatedUser = await this.userService.update(id, user);
            await this.userValidationService.validateCreate(user)
            return new UserDTO(updatedUser);
        }catch(error){
            return error
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.userService.delete(id);
        return { message: 'User deleted' };
    }
}