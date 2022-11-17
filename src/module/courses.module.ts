import { Module } from '@nestjs/common';
import { CoursesController } from '../requests/courses.controller';
import { CoursesService } from '../services/courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
