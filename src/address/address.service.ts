import { Injectable } from '@nestjs/common';
import { Address } from './entity/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  getAddressById(id: number): Promise<Address> {
    return this.addressRepository.findOneByOrFail({
      id: id,
    });
  }
}
