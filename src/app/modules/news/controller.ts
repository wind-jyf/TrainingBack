import {
  Get,
  QueryParam,
  Controller,
  UseBefore,
  BodyParam,
  Post,
  Put,
  Delete
} from 'routing-controllers';
import { FormatResponse } from '@/app/middlewares/formatResponse';

import { paginationUtils } from '@/utils';

import { NewsService } from './service';
import { LANGUAGE } from '@/constants';

@Controller('/api/crophe')
@UseBefore(FormatResponse)
export class NewsController {
  constructor(private newsService: NewsService) { }

  @Get('/newsList')
  async getNewsList(
    @QueryParam('page_size') pageSize?: number,
    @QueryParam('page') page?: number,
    @QueryParam('lan') lan?: string
  ) {
    const zhResult = async () => {
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
    };
    const enResult = async () => {
      const [newsList, total] = await this.newsService.getENNewsAndCount(
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
    };
    switch (lan) {
      case LANGUAGE.zh:
        return await zhResult();
      case LANGUAGE.en:
        return await enResult();
      default:
        return await zhResult();
    }

  }

  @Get('/newsListById')
  async getNewsListById(
    @QueryParam('id') id: number,
    @QueryParam('lan') lan: string
  ) {
    const zhResult = async () => {
      const [news] = await this.newsService.getNewsById({ id });
      return {
        ...news
      };
    }
    const enResult = async () => {
      const [news] = await this.newsService.getENNewsById({ id });
      return {
        ...news
      };
    }
    switch (lan) {
      case LANGUAGE.zh:
        return await zhResult();
      case LANGUAGE.en:
        return await enResult();
      default:
        return await zhResult();
    }

  }

  @Post('/news')
  async addNews(
    @BodyParam('name') name: String,
    @BodyParam('date') date: Date,
    @BodyParam('content') content: String,
    @BodyParam('lan') lan: String
  ) {
    const zhResult = async () => {
      const result = await this.newsService.addNews({ name, date, content });
      return result;
    }
    const enResult = async () => {
      const result = await this.newsService.addENNews({ name, date, content });
      return result;
    }
    switch (lan) {
      case LANGUAGE.zh:
        return await zhResult();
      case LANGUAGE.en:
        return await enResult();
      default:
        return await zhResult();
    }
  }

  @Put('/news')
  async updateNews(
    @BodyParam('id') id: number,
    @BodyParam('name') name: String,
    @BodyParam('date') date: Date,
    @BodyParam('content') content: String,
    @BodyParam('lan') lan: String
  ) {
    const zhResult = async () => {
      const result = await this.newsService.updateNews({ id, name, date, content })
      //const result = await this.newsService.addNews({name,date,content})
      return result;
    }
    const enResult = async () => {
      const result = await this.newsService.updateENNews({ id, name, date, content })
      return result;
    }

    switch (lan) {
      case LANGUAGE.zh:
        return await zhResult();
      case LANGUAGE.en:
        return await enResult();
      default:
        return await zhResult();
    }
  }

  @Delete('/news')
  async deleteNews(
    @BodyParam('id') id: number,
    @BodyParam('lan') lan: string
  ) {
    const zhResult = async () => {
      const [news] = await this.newsService.getNewsById({ id });
      const result = await this.newsService.deleteNews({ id });
      return result;
    }
    const enResult = async () => {
      const [news] = await this.newsService.getENNewsById({ id });
      const result = await this.newsService.deleteENNews({ ...news });
      return result;
    }
    switch (lan) {
      case LANGUAGE.zh:
        return await zhResult();
      case LANGUAGE.en:
        return await enResult();
      default:
        return await zhResult();
    }
  }

}