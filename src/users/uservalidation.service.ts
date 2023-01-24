import { HttpException, HttpStatus } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { validate } from 'class-validator';
export class UserValidationService {
  async validateCreate(user: UserDTO) {
    // Validate user input
    const errors = await validate(user);
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    this.validateEmail(user.email);
    this.validatePassword(user.password);
    this.validateName(user.name);
    this.validateNotEmpty(user.name);
  }
  validateEmail(email: string) {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      throw new HttpException(
        { message: 'Invalid email' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  validatePassword(password: string) {
    if (password.length < 8) {
      throw new HttpException(
        { message: 'Password is too short' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  validateName(name: string) {
    const nameRegex = /^[a-zA-Z0-9]+$/;
    if (!nameRegex.test(name)) {
      throw new HttpException(
        { message: 'Name contains invalid characters' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  validateNotEmpty(value: any) {
    if (!value || value.trim().length === 0) {
      throw new HttpException(
        { message: 'Input field cannot be empty' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
