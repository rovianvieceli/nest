import { Module } from '@nestjs/common';
import { CoursesController } from '../requests/courses.controller';
import { CoursesService } from '../services/courses.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
