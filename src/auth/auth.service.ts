import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  async generateUserCredentials(user: Users): Promise<LoginResponseDto> {
    const payload = {
      email: user.email,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
      user: user,
    };
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    const validated = await this.validateUser(
      loginUserDto.username,
      loginUserDto.password,
    );
    if (!validated) return;
    return await this.generateUserCredentials(validated);
  }

  async signupUser(
    createUserDto: CreateUserDto,
    createAddressDto: CreateAddressDto,
  ): Promise<any> {
    const user = await this.usersService.getUserByUsername(
      createUserDto.userName,
    );
    if (user) {
      throw new Error('User already exists');
    }

    const newUser = new Users();

    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;
    newUser.userName = createUserDto.userName;
    newUser.password = await bcrypt.hash(createUserDto.password, 10);
    newUser.email = createUserDto.email;
    newUser.phone = createUserDto.phone;
    newUser.deleted = createUserDto.deleted;

    return await this.usersService.createUser(newUser, createAddressDto);
  }
}
