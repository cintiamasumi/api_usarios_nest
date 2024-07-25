import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, IsNull } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({ nullable:true })
  parentUserId?: string

  @Column({ default: false })
  isDeleted: boolean;

}