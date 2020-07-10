import {
  Get,
  QueryParam,
  Controller,
  Post,
  Put,
  Delete,
  BodyParam,
  UseBefore
} from 'routing-controllers';
import { FormatResponse } from '@/app/middlewares/formatResponse';

import { paginationUtils } from '@/utils';

import { ProjectEntityService } from './service';

@Controller('/api/crophe')
@UseBefore(FormatResponse)
export class ProjectController {
  constructor(private projectService: ProjectEntityService) { }

  @Get('/projectList')
  async getArticleList(
    @QueryParam('page_size') pageSize?: number,
    @QueryParam('page') page?: number,
  ) {
    const [projectList, total] = await this.projectService.getProjectEntityAndCount(
      {
        order: { id: 'DESC' }
      }, 
      paginationUtils.getCondition(page, pageSize)
      );
    return {
      projectList,
      pagination: paginationUtils.getResponse(total, page, pageSize)
    };
  }

  @Post('/project')
  async addProject(
    @BodyParam('projectname') projectname?: String
  ) {
    const result = await this.projectService.addProject({ projectname });
    return result;
  }

  @Put('/project')
  async updateProject(
    @BodyParam('projectname') projectname?: String,
    @BodyParam('id') id?: number
  ) {
    const result = await this.projectService.updateProject({id, projectname});
    return result;
  }

  @Delete('/project')
  async deleteProject(
    @BodyParam('id') id?: number
  ) {
    const result = await this.projectService.deleteProject({id});
    return result;
  }
}
