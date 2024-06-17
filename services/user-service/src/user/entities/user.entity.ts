import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { UserProfile } from './user-profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToOne(() => UserProfile)
  @JoinColumn()
  profile: UserProfile;
}
