import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile('file') file: Express.Multer.File): Promise<any> {
    if (!file)
      throw new HttpException('File was not present', HttpStatus.BAD_REQUEST);

    return this.filesService.saveFile(file);
  }

  @Get(':id')
  async get(@Param() params: { id: number }, @Res() res: Response) {
    const fileEntity = await this.filesService.getFileAndData(params.id);
    res.setHeader('Content-Type', fileEntity.mimetype);

    const file = createReadStream(
      FilesService.FILE_STORAGE_DIR + '/' + fileEntity.filename,
    );

    file.pipe(res);
  }
}
