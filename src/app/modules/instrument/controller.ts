import {
    Get,
    QueryParam,
    Controller,
    Post,
    Delete,
    BodyParam,
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

      @Post('/instrument')
      async addInstrument(
        @BodyParam('name') name:String,
        @BodyParam('content') content:String,
        @BodyParam('lan') lan:String
      ){
        const zhResult = async ()=>{
          const  result  = await this.instrumentService.addInstrument({name,content});
          return result;
        }
        const enResult = async ()=>{
          const  result  = await this.instrumentService.addENInstrument({name,content});
          return result;
        }
        switch(lan){
          case LANGUAGE.zh:
              return await zhResult();
          case LANGUAGE.en:
              return await enResult();
          default:
              return await zhResult();
        }
      }

      @Delete('/instrument')
      async deleteNews(
        @BodyParam('id') id:number,
        @BodyParam('lan') lan:string
      ){
        const zhResult = async ()=>{
          const result = await this.instrumentService.deleteInstrument({id});
          return result;
        }
        const enResult = async ()=>{
          const result = await this.instrumentService.deleteENInstrument({id});
          return result;
        }
        switch(lan){
          case LANGUAGE.zh:
              return await zhResult();
          case LANGUAGE.en:
              return await enResult();
          default:
              return await zhResult();
        }
      }
  }