import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnUser } from './types';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<ReturnUser[]> {
    const users = await this.prisma.user.findMany();
    if (users) return users;
    throw new NotFoundException('No users were found');
  }

  async getById(id: string): Promise<ReturnUser> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        password: false,
        authStrategy: true,
      },
    });

    if (user) return user;

    throw new NotFoundException('User not found');
  }

  async getByEmail(email: string): Promise<ReturnUser> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        password: false,
        authStrategy: true,
      },
    });

    if (user) return user;

    throw new NotFoundException('User not found');
  }

  async getByUsername(username: string): Promise<ReturnUser> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        password: false,
        authStrategy: true,
      },
    });

    if (user) return user;

    throw new NotFoundException('User not found');
  }

  // async create() {}
}
