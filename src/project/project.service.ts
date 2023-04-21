import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './project.model';
import { Observable } from 'rxjs';



@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project)
        private projectModel: typeof Project
    ) { }

    async findAll(): Promise<Project[]> {
        return this.projectModel.findAll();
    }

    async findOne(id: string): Promise<Project> {

        return this.projectModel.findOne({
            where: {
                id,
            }
        });

    }


    async createProject(project): Promise<Project> {

        return this.projectModel.create(project);
    }



}
