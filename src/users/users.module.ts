import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './user.service';
import { UserValidationService } from './uservalidation.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserValidationService]
})
export class UsersModule {}
