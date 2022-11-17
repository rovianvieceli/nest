import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoursesService } from '../services/courses.service';
import { CreateCourseDto } from '../domain/create-course.dto';
import { UpdateCourseDto } from '../domain/update-course.dto';

@Controller('courses')
export class CoursesController {
  public constructor(private readonly coursesService: CoursesService) {}

  @Get()
  public findAll() {
    return this.coursesService.findAllCourse();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.coursesService.findOneCourse(+id);
  }

  @Post()
  public create(@Body() createCourse: CreateCourseDto) {
    return this.coursesService.createCourse(createCourse);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateCourse: UpdateCourseDto,
  ) {
    return this.coursesService.updateCourse(+id, updateCourse);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.coursesService.removeCourse(+id);
  }
}
