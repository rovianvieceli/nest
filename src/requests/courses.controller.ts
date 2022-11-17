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
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  public findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post()
  public create(@Body() createCourse: CreateCourseDto) {
    return this.coursesService.create(createCourse);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateCourse: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, updateCourse);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
