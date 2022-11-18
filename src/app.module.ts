import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './modules/course/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmAsyncConfig from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig), CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
