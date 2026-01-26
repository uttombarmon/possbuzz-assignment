import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  // For New User Register
  async registerUser(registerDto: RegisterDto) {
    /*
    1. check user is exit or not
    2. if exits show error or not exit go next steps
    3. encrypt the password
    4. save the user in database
    5. make a jwt token if user create success otherwise show error
    6. set the token in the client cookies or send the token
     */
    // check user is exit or not
    const user = await this.userService.checkUserExits(registerDto.email);
    // console.log(user);
    if (user) {
      throw new ConflictException('User already exits!');
    }
    // save the user in database
    const newUser = await this.userService.createUser(registerDto);
    if (!newUser) {
      throw new InternalServerErrorException();
    }
    // console.log(process.env.JWT_SECRET);
    const accessToken = await this.jwtService.signAsync({
      sub: newUser.id,
      email: newUser.email,
    });
    console.log('accessToken: ', accessToken);
    return {
      data: newUser,
      accessToken: accessToken,
    };
  }
  getUser(loginDto: LoginDto) {
    const user = this.userService.checkUserExits(loginDto.email);
    return user;
  }
}
