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
      constructor(private newsService: NewsService) {}

      @Get('/newsList')
      async getNewsList(
        @QueryParam('page_size') pageSize?: number,
        @QueryParam('page') page?: number,
        @QueryParam('lan') lan?:string
      ) {
          const zhResult = async () =>{
            const [newsList, total] = await this.newsService.getNewsAndCount(
              {
                select: ['id', 'name', 'date'],
                order: { id: 'DESC' }
              }, 
              paginationUtils.getCondition(page, pageSize)
            );
          return {
            newsList,
            lan:'中文',
            pagination: paginationUtils.getResponse(total, page, pageSize)
          };
          };
          const enResult = async () =>{
            const [newsList, total] = await this.newsService.getENNewsAndCount(
              {
                order: { id: 'DESC' }
              }, 
              paginationUtils.getCondition(page, pageSize)
            );
          return {
            newsList,
            lan:'英文',
            pagination: paginationUtils.getResponse(total, page, pageSize)
          };
          };
          switch(lan){
            case LANGUAGE.zh:
                return await zhResult();
            case LANGUAGE.en:
                return await enResult();
            default:
                return await zhResult();
          }

  }
  async getImg(content: any){
    let imgsrc:any=[];
    const str = /<img\b.*?(?:\>|\/>)/gi;
    const str1 = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
    let image = content.match(str);
    //console.log(image)
    
    if(image){
        //console.log("替换")
        for(let i = 0;i<image.length;i++){
            imgsrc[i] = image[i].match(str1)[1];
        }
    }
    
    //console.log('okk')
    return imgsrc;
}
  async setImg(content:any,imgsrc:any,replacestr:any){
      for(let i = 0;i<imgsrc.length;i++){
          content = content.replace(imgsrc[i],replacestr[i])
      }
      return content;
  }
  @Get('/newsListById')
  async getNewsListById(
    @QueryParam('id') id: number,
    @QueryParam('lan') lan: string
  ) {
    const zhResult = async () => {
      
      const [news] = await this.newsService.getNewsById({ id });
      
      let {content} = news;
      let imageSrc = [];
      imageSrc = await this.getImg(content);
      let replacestr:any[] = [];
      if(imageSrc.length!=0){
        for(let i =0;i<imageSrc.length;i++){
          if(/^http/g.test(imageSrc[i])){
            replacestr.push(imageSrc[i]);
          }else{
            replacestr.push(`http://plantphenomics.hzau.edu.cn/${imageSrc[i]}`)
          }
          
        }
        content = await this.setImg(content,imageSrc,replacestr);
        news.content = content; 
      }
      console.log(news);
      
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
        @BodyParam('name') name:String,
        @BodyParam('date') date:string,
        @BodyParam('content') content:String,
        @BodyParam('lan') lan:String
      ){
        const zhResult = async ()=>{
          const  result  = await this.newsService.addNews({name,date,content});
          return result;
        }
        const enResult = async ()=>{
          const  result  = await this.newsService.addENNews({name,date,content});
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

      @Put('/news')
      async updateNews(
        @BodyParam('id') id:number,
        @BodyParam('name') name:String,
        @BodyParam('date') date:String,
        @BodyParam('content') content:String,
        @BodyParam('lan') lan:String
      ){
        const zhResult = async ()=>{
          const result = await this.newsService.updateNews({id,name,date,content})
          //const result = await this.newsService.addNews({name,date,content})
          return result;
        }
        const enResult = async ()=>{
          const result = await this.newsService.updateENNews({id,name,date,content})
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
