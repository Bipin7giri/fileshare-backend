import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../utils/databaseutils/base.entity";
import { UserCredential } from "./UserCredential.entities";
@Entity()
export class User extends BaseEntity {
  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  isBlocked: boolean;

  @OneToOne(() => UserCredential, (uc) => uc.userId)
  @JoinColumn({ name: "user_credential_id" })
  userCredentialId: UserCredential | number;

 
}
