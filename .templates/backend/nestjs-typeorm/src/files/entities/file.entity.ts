import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1024 })
  filename: string;

  @Column({ length: 1024, nullable: true })
  originalFilename: string | null;

  @Column({ length: 64 })
  mimetype: string;
}
