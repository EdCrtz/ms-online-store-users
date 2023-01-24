import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
    prisma = new PrismaClient()

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async create(user: UserDTO) {
        return await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });
    }

    async update(id: string, user: UserDTO) {
        return await this.prisma.user.update({
            where: { id },
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });
    }

    async delete(id: string) {
        return await this.prisma.user.delete({ where: { id } });
    }
}