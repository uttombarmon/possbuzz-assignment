import { Body, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async checkUserExits(email: string) {
    const exitUser = await this.prisma.user.findFirst({
      where: { email },
    });
    console.log('exituser: ', exitUser);
    return exitUser;
  }
  async createUser(userData: RegisterDto) {
    const saltOrRounds = 10;
    // const password = 'random_password';
    const hash = await bcrypt.hash(userData.password, saltOrRounds);
    const newUser = await this.prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        updatedAt: true,
        createdAt: true,
      },
    });
    return newUser;
  }
  async findUser(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }
}
