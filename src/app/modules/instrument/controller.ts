import {
    Get,
    QueryParam,
    Controller,
    UseBefore
  } from 'routing-controllers';
  import { FormatResponse } from '@/app/middlewares/formatResponse';

  import { paginationUtils } from '@/utils';

  import { InstrumentService } from './service';
  import { LANGUAGE } from '@/constants';

  @Controller('/api/crophe')
  @UseBefore(FormatResponse)
  export class NewsController {
      constructor(private instrumentService: InstrumentService) {}

      @Get('/instrumentList')
      async getInstrumentList(
        @QueryParam('lan') lan: string,
        @QueryParam('page_size') pageSize?: number,
        @QueryParam('page') page?: number,
      ) {

        const zhResult = async () => {
          const [instrumentList, total] = await this.instrumentService.getInstrumentAndCount(
            {
              select: ['id', 'name']
            }, 
            paginationUtils.getCondition(page, pageSize
          ));
          return {
            instrumentList,
            pagination: paginationUtils.getResponse(total, page, pageSize)
          };
         };
         
         const enResult = async () => {
          const [instrumentList, total] = await this.instrumentService.getInstrumentEnAndCount(paginationUtils.getCondition(page, pageSize));
          return {
            instrumentList,
            pagination: paginationUtils.getResponse(total, page, pageSize)
          };
         };
  
         switch(lan) {
            case LANGUAGE.zh:
             return await zhResult();
            case LANGUAGE.en:
             return await enResult();
            default:
              return await zhResult();
         }
      }

      @Get('/instrumentById')
      async getInstrumentById(
        @QueryParam('lan') lan: string,
        @QueryParam('id') id: number,
      ) {

        const zhResult = async () => {
          const [ instrument ] = await this.instrumentService.getInstrumentById({id});
          return {
            ...instrument
          };
        }

        const enResult = async () => {
          const [ instrument ] = await this.instrumentService.getInstrumentEnById({id});
          return {
            ...instrument
          };
        }

        switch(lan) {
          case LANGUAGE.zh:
           return await zhResult();
          case LANGUAGE.en:
           return await enResult();
          default:
            return await zhResult();
       }
      }
  }