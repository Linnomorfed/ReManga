import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('restriction')
export class RestrictionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
