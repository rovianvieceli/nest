import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from '../entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from '../domain/create-course.dto';
import { UpdateCourseDto } from '../domain/update-course.dto';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class CoursesService {
  public constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
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

  public async createCourse(createCourseDto: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDto.tags.map((name: string) => this.preloadTagByName(name)),
    );
    const course = this.courseRepository.create({ ...createCourseDto, tags });
    return this.courseRepository.save(course);
  }

  public async updateCourse(id: number, updateCourseDto: UpdateCourseDto) {
    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name: string) => this.preloadTagByName(name)),
      ));
    const course = await this.courseRepository.preload({
      id: id,
      ...updateCourseDto,
      tags,
    });
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

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOneBy({ name: name });
    if (tag) {
      return tag;
    }

    return this.tagRepository.create({ name });
  }
}
