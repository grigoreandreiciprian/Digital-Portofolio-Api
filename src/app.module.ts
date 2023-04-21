import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'mysql',
    host: "applications-db.cl3ujvwzxoef.us-east-1.rds.amazonaws.com",
    port: 3306,
    username: "root",
    password: "19119700gG.",
    database: "digitalPortofolio",
    autoLoadModels: true,
    synchronize: true

  }), ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
