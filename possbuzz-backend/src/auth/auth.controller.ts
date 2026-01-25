import { AuthService } from './auth.service';
import { Controller, Get, Post } from '@nestjs/common';

@Controller('api/v1/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  registerUser(): string {
    return 'Register Called';
  }

  @Get('user')
  getUser() {
    return this.authService.getUser();
  }
}
