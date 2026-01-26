import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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
}
