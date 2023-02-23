import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  zip_code: string;

  @Column()
  cost: number;

  @Column()
  done: boolean;

  @Column()
  deadline: Date;

  @Column()
  username: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => User, user => user.projects)
  user: User;
}




