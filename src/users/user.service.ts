import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  async findAll() {
    return await this.prisma.user.findMany();
  }
  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async create(user: UserDTO) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    return await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });
  }

  async update(id: string, user: UserDTO) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    return await this.prisma.user.update({
      where: { id },
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
