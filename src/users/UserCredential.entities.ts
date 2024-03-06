import { Column, Entity, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "../utils/databaseutils/base.entity";

@Entity()
export class UserCredential extends BaseEntity {
  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.userCredentialId)
  userId: User;
}
