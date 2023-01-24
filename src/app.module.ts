import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@nestjs/core/router/router-module';

@Module({
  imports: [
    UsersModule,
    RouterModule.register([
      {
        path: 'api/v1',
        module: UsersModule,
      },
    ]),
  ],
  providers: [],
})
export class AppModule {}
