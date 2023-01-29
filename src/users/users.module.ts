import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './user.service';
import { UserValidationService } from './uservalidation.service';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, UserValidationService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api/v1/users/user');
  }
}
