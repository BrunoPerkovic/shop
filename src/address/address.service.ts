import { Injectable } from '@nestjs/common';
import { Address } from './address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

type NewType = Address;

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  /* async createAddress(createAddressDto: createAddressDto): Promise<Address> {
      const address = this.addressRepository.create({});
    } */
}
