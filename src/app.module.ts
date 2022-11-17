import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './module/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoursesModule,
    TypeOrmModule.forRoot({
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'sample',
      autoLoadEntities: true,
      synchronize: true,
      type: 'mysql',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
