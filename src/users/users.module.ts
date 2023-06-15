import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  imports: [AuthService],
})
export class UsersModule {}
