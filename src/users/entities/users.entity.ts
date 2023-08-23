import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Address } from 'src/address/entity/address.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Role } from 'src/auth/roles/auth.roles';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';

registerEnumType(Role, {
  name: 'Role',
  description: 'User roles on the platform',
});

@Entity()
@ObjectType()
export class Users {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Field()
  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Field()
  @Column({ name: 'user_name', unique: true, nullable: false })
  userName: string;

  @Field()
  @Column({ name: 'password', nullable: false })
  password: string;

  @Field()
  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Field()
  @Column({ name: 'phone', unique: true, nullable: true })
  phone: string;

  @Field(() => Role)
  @Column({
    name: 'role',
    type: 'enum',
    enum: Role,
    nullable: false,
    default: Role.User,
  })
  role: Role;

  @Field()
  @Column({ name: 'deleted', type: 'boolean', nullable: false })
  deleted: boolean;

  @Field()
  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @Field()
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @Field(() => Address, { nullable: false })
  @ManyToOne(() => Address, (address) => address.users)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Field(() => Post, { description: 'authos posts' })
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
