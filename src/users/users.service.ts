import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const saltOrRounds = 10;

      const user = this.userRepository.create({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        addressId: createUserDto.addressId,
        userName: createUserDto.userName,
        password: await bcrypt.hash(createUserDto.password, saltOrRounds),
        email: createUserDto.email,
        phone: createUserDto.phone,
        deleted: false,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        if (error.detail.includes('user_name')) {
          throw new ConflictException('Username already exists.');
        }
        if (error.detail.includes('email')) {
          throw new ConflictException('Email already exists.');
        }
        if (error.detail.includes('phone')) {
          throw new ConflictException('Phone number already exists.');
        }
      }
      throw new Error(`Something went wrong with updating your profile`);
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOneByOrFail({
      id: id,
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneByOrFail({
      email: email,
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new Error(`There is no user with id:${id}`);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    user.deleted = true;
    await this.userRepository.save(user);
  }
}
