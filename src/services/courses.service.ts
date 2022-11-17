import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from '../entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundamento do Framework nestJS',
      description: 'Fundamento do Framework nestJS',
      tags: ['NodeJS', 'Nest', 'Typescript'],
    },
  ];

  public findAll() {
    return this.courses;
  }

  public findOne(id: string) {
    const course = this.courses.find((course) => course.id === Number(id));
    if (!course) {
      throw new HttpException(
        `Course ID #${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  public create(crateCourse: any) {
    this.courses.push(crateCourse);
    return crateCourse;
  }

  public update(id: string, updateCourse: any) {
    const indexCourse = this.courses.findIndex((p) => p.id === Number(id));
    this.courses[indexCourse] = updateCourse;
  }

  public remove(id: string) {
    const indexCourse = this.courses.findIndex((p) => p.id === Number(id));

    if (indexCourse >= 0) {
      this.courses.splice(indexCourse, 1);
    }
  }
}
