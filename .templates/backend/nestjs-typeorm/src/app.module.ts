import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {FilesModule} from "./files/files.module";
import {FileEntity} from "./files/entities/file.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'postgres',
      username: 'postgres',
      password: 'carrots-are-healthy',
      synchronize: true,
      port: 6432,
      entities: [FileEntity],
    }),
    FilesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
