import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserInput: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create({
        firstName: createUserInput.firstName,
        lastName: createUserInput.lastName,
        addressId: createUserInput.addressId,
        userName: createUserInput.userName,
        password: createUserInput.password,
        email: createUserInput.email,
        phone: createUserInput.phone,
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
