'@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { UserValidationService } from './uservalidation.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private userValidationService: UserValidationService,
  ) {}

  @Get()
  async findAll(): Promise<UserDTO[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new UserDTO(user));
  }
  @Get('user')
  async findOne(@Response() res): Promise<UserDTO> {
    const userInfo = res.locals.user;
    const user = await this.userService.findOne(userInfo.id);
    return res.status(HttpStatus.OK).send(user);
  }
  @Post()
  async create(@Body() user: UserDTO) {
    try {
      await this.userValidationService.validateCreate(user);
      const createdUser = await this.userService.create(user);
      return new UserDTO(createdUser);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Put('user')
  async update(@Response() res, @Body() user: UserDTO) {
    try {
      const userInfo = res.locals.user;
      const updatedUser = await this.userService.update(userInfo.id, user);
      await this.userValidationService.validateCreate(user);
      return res.status(HttpStatus.OK).send(updatedUser);
    } catch (error) {
      return error;
    }
  }

  @Delete('user')
  async delete(@Response() res) {
    const userInfo = res.locals.user;
    await this.userService.delete(userInfo.id);
    return res.status(HttpStatus.OK).send({ message: 'User deleted' });
  }
}
