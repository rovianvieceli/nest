import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from '../entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from '../domain/create-course.dto';
import { UpdateCourseDto } from '../domain/update-course.dto';

@Injectable()
export class CoursesService {
  public constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  public findAllCourse() {
    return this.courseRepository.find();
  }

  public findOneCourse(id: number) {
    console.log(id);
    const course = this.courseRepository.findOneBy({ id: +id });
    if (!course) {
      throw new NotFoundException(`Course ID #${id} Not Found`);
    }
    return course;
  }

  public createCourse(crateCourse: CreateCourseDto) {
    const course = this.courseRepository.create(crateCourse);
    return this.courseRepository.save(course);
  }

  public async updateCourse(id: number, updateCourse: UpdateCourseDto) {
    const data = { id: id, ...updateCourse };
    const course = await this.courseRepository.preload(data);
    if (!course) {
      throw new NotFoundException(`Course ID #${id} Not Found`);
    }
    return this.courseRepository.save(course);
  }

  public async removeCourse(id: number) {
    const course = await this.courseRepository.findOneBy({ id: id });
    if (!course) {
      throw new NotFoundException(`Course ID #${id} Not Found`);
    }
    return this.courseRepository.remove(course);
  }
}
