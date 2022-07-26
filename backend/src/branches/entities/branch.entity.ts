import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('branches')
export class BranchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mangaId: number;

  @Column()
  translatorsTeamId: number;
}
