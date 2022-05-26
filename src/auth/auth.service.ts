import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReturnUser } from 'src/user/types';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  async signIn(usernameOrEmail: string, password: string): Promise<ReturnUser> {
    const isEmail = usernameOrEmail.includes('@');
    const isUsername = !isEmail;

    if (isEmail) {
      const user = await this.prisma.user.findUnique({
        where: { email: usernameOrEmail },
      });

      if (user) {
        const userPassword = await argon.verify(user.password, password);

        if (!userPassword) throw new ForbiddenException('Invalid Credentials');

        return await this.userService.getByEmail(usernameOrEmail);
      }

      throw new NotFoundException("User doesn't exist");
    }

    if (isUsername) {
      const user = await this.prisma.user.findUnique({
        where: {
          username: usernameOrEmail,
        },
      });

      if (user) {
        const userPassword = await argon.verify(user.password, password);

        if (!userPassword) throw new ForbiddenException('Invalid Credentials');

        return await this.userService.getByUsername(usernameOrEmail);
      }

      throw new NotFoundException("User doesn't exist");
    }
  }
}
