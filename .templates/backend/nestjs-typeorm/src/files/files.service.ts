import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as fs from 'fs';
import {randomUUID} from 'crypto';
import {FileEntity} from "./entities/file.entity";

@Injectable()
export class FilesService {
  public static FILE_STORAGE_DIR = './.fileStorage';

  constructor(
    @InjectRepository(FileEntity) private filesRepository: Repository<FileEntity>,
  ) {}

  private createTmpDirIfNeeded(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const exists = fs.existsSync(FilesService.FILE_STORAGE_DIR);

      if (!exists) {
        fs.mkdir(FilesService.FILE_STORAGE_DIR, { recursive: true }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  public async saveFile(file: Express.Multer.File): Promise<{ id: number }> {
    await this.createTmpDirIfNeeded();

    const storageFilename = randomUUID();
    const mimetype = file.mimetype;

    await new Promise<void>((resolve) => {
      fs.writeFile(
        FilesService.FILE_STORAGE_DIR + '/' + storageFilename,
        file.buffer,
        {},
        () => {
          resolve();
        },
      );
    });

    const result = await this.filesRepository.save({
      filename: storageFilename,
      originalFilename: file.filename ?? file.originalname ?? null,
      mimetype: mimetype,
    });

    return {
      id: result.id,
    };
  }

  public async getFileAndData(id: number): Promise<FileEntity> {
    const file = await this.filesRepository.findOneBy({ id: id });
    if (!file) throw new Error('File not found');

    return file;
  }
}
