import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('types')
export class TypesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
