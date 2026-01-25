import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getUser() {
    return 'register service';
  }
}
