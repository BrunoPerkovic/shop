import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: number, password: string): Promise<any> {
    const user = await this.usersService.getUserById(id);

    const valid = await bcrypt.compare(password, user?.password);

    if (user && valid) {
      const { ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        username: user.userName,
        sub: user.id,
      }),
      user,
    };
  }

  async signup(id: number, loginUserInput: LoginUserDto) {
    const user = await this.usersService.getUserById(id);

    if (user) {
      throw new Error(`User already exists`);
    }

    const password = await bcrypt.hash(user.password, 10);

    return this.usersService.createUser({
      ...loginUserInput,
      password,
    });
  }
}
