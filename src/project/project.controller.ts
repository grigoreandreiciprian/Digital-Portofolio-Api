import { Body, Controller, Get, HttpStatus, Param, Post, Res, Put, Delete, UseInterceptors, UploadedFile, Req, RawBodyRequest } from '@nestjs/common';
import { ProjectService } from "./project.service";

import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';


export const storage = {
    storage: diskStorage({
        destination: '../uploads/images',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extenstion: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extenstion}`)
        }
    })

}

@Controller('project')
export class ProjectController {

    constructor(private readonly projectService: ProjectService) { }


    @Post()
    async createProject(@Res() response, @Body() project) {

        const newProject = await this.projectService.createProject(project)
        return response.status(HttpStatus.CREATED).json({ newProject })
    }


    @Get()
    async fetchAll(@Res() response) {
        const projects = await this.projectService.findAll()
        return response.status(HttpStatus.OK).json({ projects })
    }

    @Get(":id")
    async findById(@Res() response, @Param("id") id) {
        const project = await this.projectService.findOne(id)

        return response.status(HttpStatus.OK).json({
            project
        })

    }

    @Put('/update/:id')
    async updateProject(@Res() response, @Param("id") id: any, @Body() project) {

        const toUpdate = await this.projectService.findOne(id)


        if (toUpdate) {
            toUpdate.set({
                title: project.title,
                category: project.category,
                link: project.link,
                picture: project.picture
            })
        }

        toUpdate.save()

        return response.status(HttpStatus.OK).json({
            project
        })
    }


    @Delete(":id")
    async deleteProject(@Res() response, @Param("id") id: any) {

        const toDelete = await this.projectService.findOne(id)

        if (toDelete) {

            toDelete.destroy()
        }

        toDelete.save()

        return response.status(HttpStatus.OK).json({
            toDelete
        })
    }

    @Put('upload/:id')
    @UseInterceptors(FileInterceptor('file', storage))
    async uploadFile(@UploadedFile() file, @Param("id") id): Promise<object> {
        console.log(file)

        const project = await this.projectService.findOne(id)

        project.set({
            picture: file.path
        })

        project.save()
        return of({ imagePath: file.filename })
    }

    @Put("/upload/:id")
    async uploadPhoto(@Req() request, @Param("id") id: any, @Body() picture) {





        const project = await this.projectService.findOne(id)



        if (project) {
            project.set({
                picture: picture
            })

            project.save()
        }


    }
}



