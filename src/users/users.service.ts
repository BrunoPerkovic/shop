import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { Address } from 'src/address/entity/address.entity';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    createAddressDto: CreateAddressDto,
  ): Promise<Users> {
    const saltOrRounds = 10;

    try {
      const { street, streetNumber, city, county, country, postalCode } =
        createAddressDto;

      const address = this.addressRepository.create({
        street,
        streetNumber,
        city,
        county,
        country,
        postalCode,
      });

      const user = this.userRepository.create({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        userName: createUserDto.userName,
        password: await bcrypt.hash(createUserDto.password, saltOrRounds),
        email: createUserDto.email,
        phone: createUserDto.phone,
        deleted: createUserDto.deleted,
        address: address,
      });

      await this.addressRepository.save(address);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        if (error.detail.includes('user_name')) {
          throw new ConflictException(
            `User with username ${createUserDto.userName} already exists. Please use another username.`,
          );
        }
        if (error.detail.includes('email')) {
          throw new ConflictException(
            `User with email ${createUserDto.email} already exists. Please use another email`,
          );
        }
        if (error.detail.includes('phone')) {
          throw new ConflictException(
            `User with phone number ${createUserDto.phone} already exists. Please use another phone number`,
          );
        }
      }
      throw new Error(
        'Something went wrong with creating your profile. Most likely wrong input.',
      );
    }
  }
  async getAllUsers(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<Users> {
    return await this.userRepository.findOneByOrFail({
      id: id,
    });
  }

  async getUserByEmail(email: string): Promise<Users> {
    return await this.userRepository.findOneByOrFail({
      email: email,
    });
  }

  async getUserByUsername(username: string): Promise<Users> {
    return await this.userRepository.findOneByOrFail({
      userName: username,
    });
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Users> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException(`There is no user with id:${id}`);
    }

    Object.assign(user, updateUserDto);

    if (updateAddressDto) {
      const address = user.address || new Address();
      Object.assign(address, updateAddressDto);
      user.address = await this.addressRepository.save(address);
    }

    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    user.deleted = true;
    await this.userRepository.save(user);
  }
}
