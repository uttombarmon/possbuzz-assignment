import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  // For New User Register
  async registerUser(registerDto: RegisterDto) {
    /*
    1. check user is exit or not
    2. if exits show error or not exit go next steps
    3. encryptthe password
    4. save the user in database
    5. make a jwt token if user create success otherwise show error
    6. set the token in the client cookies or send the token
     */
    const user = await this.userService.checkUserExits(registerDto.email);
    console.log(user);
    return user;
  }
  getUser(loginDto: LoginDto) {
    const user = this.userService.checkUserExits(loginDto.email);
    return user;
  }
}
