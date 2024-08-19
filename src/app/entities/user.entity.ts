// import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class User extends BaseEntity {

//   @PrimaryGeneratedColumn()
//   id: number;

// }

import { hashPassword } from "@foal/core";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

@Entity()
export class User  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hashPassword(this.password);
  }
}
