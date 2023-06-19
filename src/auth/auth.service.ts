import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  async generateUserCredentials(user: User): Promise<LoginResponseDto> {
    const payload = {
      email: user.email,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  /* async signup(id: number, loginUserInput: LoginUserDto) {
    const user = await this.usersService.getUserById(id);

    if (user) {
      throw new Error(`User already exists`);
    }

    const password = await bcrypt.hash(user.password, 10);

    return this.usersService.createUser({
      ...loginUserInput,
      password,
    });
  } */

  //async signupUser() {}

  async loginUser(loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    if (!user) {
      throw new BadRequestException(
        `Email or password are invalid. Please try again`,
      );
    } else {
      return this.generateUserCredentials(user);
    }
  }
}
