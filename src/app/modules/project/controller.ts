import {
    Get,
    QueryParam,
    Controller,
    UseBefore
  } from 'routing-controllers';
  import { FormatResponse } from '@/app/middlewares/formatResponse';

  import { paginationUtils } from '@/utils';

  import { ProjectEntityService } from './service';

  @Controller('/api/crophe')
  @UseBefore(FormatResponse)
  export class ProjectController {
      constructor(private projectService: ProjectEntityService) {}

      @Get('/projectList')
      async getArticleList(
        @QueryParam('page_size') pageSize?: number,
        @QueryParam('page') page?: number,
      ) {
          const [projectList, total] = await this.projectService.getProjectEntityAndCount(paginationUtils.getCondition(page, pageSize));
          return {
            projectList,
            pagination: paginationUtils.getResponse(total, page, pageSize)
          };
      }
  }