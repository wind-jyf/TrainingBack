import {
    Get,
    QueryParam,
    Controller,
    UseBefore
  } from 'routing-controllers';
  import { FormatResponse } from '@/app/middlewares/formatResponse';

  import { paginationUtils } from '@/utils';

  import { NewsService } from './service';

  @Controller('/api/crophe')
  @UseBefore(FormatResponse)
  export class NewsController {
      constructor(private newsService: NewsService) {}

      @Get('/newsList')
      async getNewsList(
        @QueryParam('page_size') pageSize?: number,
        @QueryParam('page') page?: number,
      ) {

          const [newsList, total] = await this.newsService.getNewsAndCount(
              {
                select: ['id', 'name', 'date'],
                order: { id: 'DESC' }
              }, 
              paginationUtils.getCondition(page, pageSize)
            );
          return {
            newsList,
            pagination: paginationUtils.getResponse(total, page, pageSize)
          };
      }

      @Get('/newsListById')
      async getNewsListById(
        @QueryParam('id') id: number,
      ) {

          const [ news ] = await this.newsService.getNewsById({id});
          return {
            ...news
          };
      }
  }