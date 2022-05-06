import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
class FileEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @Column()
  public key: string;
}

export default FileEntity;
