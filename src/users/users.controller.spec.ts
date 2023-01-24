import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from './user.service';
import { UserValidationService } from './uservalidation.service';
import { UserDTO } from './user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserValidationService],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });
});
//   describe('findAll', () => {
//     it('should return an array of users', async () => {
//       const result = [{ id: 1, name: 'test', email: 'test@test.com' }];
//       jest.spyOn(userService, 'findAll').mockImplementation(() => result);

//       expect(await userController.findAll()).toBe(result);
//     });
//   });

//   describe('create', () => {
//     it('should create a user', async () => {
//       const user: UserDTO = { name: 'test', email: 'test@test.com', password: 'testpassword' };
//       const result = { id: 1, ...user };
//       jest.spyOn(userService, 'create').mockImplementation(() => result);
//       jest.spyOn(userController['userValidationService'], 'validateCreate').mockImplementation(() => {});

//       expect(await userController.create(user)).toBe(result);
//     });

//     it('should throw an error if validation fails', async () => {
//       const user: UserDTO = { name: '', email: 'test', password: 'short' };
//       jest.spyOn(userController['userValidationService'], 'validateCreate').mockImplementation(() => {
//         throw new HttpException({ message: 'Validation failed' }, HttpStatus.BAD_REQUEST);
//       });

//       try {
//         await userController.create(user);
//       } catch (error) {
//         expect(error).toBeInstanceOf(HttpException);
//         expect(error.status).toBe(HttpStatus.BAD_REQUEST);
//       }
//       });
//       });
      
//       describe('update', () => {
//       it('should update a user', async () => {
//       const user: UserDTO = { name: 'updated', email: 'updated@test.com' };
//       const result = { id: 1, ...user };
//       jest.spyOn(userService, 'update').mockImplementation(() => result);
//       jest.spyOn(userController['userValidationService'], 'validateCreate').mockImplementation(() => {});
//       expect(await userController.update('1', user)).toBe(result);
// });

// it('should throw an error if validation fails', async () => {
//   const user: UserDTO = { name: '', email: 'test', password: 'short' };
//   jest.spyOn(userController['userValidationService'], 'validateCreate').mockImplementation(() => {
//     throw new HttpException({ message: 'Validation failed' }, HttpStatus.BAD_REQUEST);
//   });

//   try {
//     await userController.update('1', user);
//   } catch (error) {
//     expect(error).toBeInstanceOf(HttpException);
//     expect(error.status).toBe(HttpStatus.BAD_REQUEST);
//   }
// });
// });

// describe('delete', () => {
//   it('should delete a user', async () => {
//     jest.spyOn(userService, 'delete').mockImplementation(() => {});
//       expect(await userController.delete('1')).toEqual({ message: 'User deleted' });
//     });
//     });
//     });
