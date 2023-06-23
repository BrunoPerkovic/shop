import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product/product.service';
import { ProductResolver } from './product/product.resolver';
import { ProductModule } from './product/product.module';
import { Product } from './product/entity/product.entity';
import { Category } from './category/entity/category.entity';
import { Address } from './address/entity/address.entity';
import { Users } from './users/entities/users.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        retryAttempts: 10,
        retryDelay: 5000,
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature([Product, Category, Address, Users, Order]),
    GraphQLModule.forRoot({
      sortSchema: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    AuthModule,
    UsersModule,
    OrdersModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProductService, ProductResolver],
})
export class AppModule {}
