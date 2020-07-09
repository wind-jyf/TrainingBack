import {
  Get,
  QueryParam,
  Controller,
  Post,
  Put,
  BodyParam,
  Body,
  Delete,
  UseBefore,
  UploadedFile
} from 'routing-controllers';
import { FormatResponse } from '@/app/middlewares/formatResponse';

import { paginationUtils } from '@/utils';

import { GroupService } from './service';
import { LANGUAGE } from '@/constants';
const bodyParser = require('koa-bodyparser');


@Controller('/api/crophe')
@UseBefore(FormatResponse,bodyParser())
export class GroupController {
    constructor(private groupService: GroupService) {}

    @Get('/groupList')
    async getGroupList(
      @QueryParam('lan') lan: string,
      @QueryParam('page_size') pageSize?: number,
      @QueryParam('page') page?: number,
    ) {

       const zhResult = async () => {
        const [groupList, total] = await this.groupService.getGroupAndCount(paginationUtils.getCondition(page, pageSize));
        return {
          groupList,
          pagination: paginationUtils.getResponse(total, page, pageSize)
        };
       };
       
       const enResult = async () => {
        const [groupList, total] = await this.groupService.getGroupEnAndCount(paginationUtils.getCondition(page, pageSize));
        for(let i =0;i<groupList.length;i++){
          groupList[i]['img'] = `http://plantphenomics.hzau.edu.cn/${groupList[i]['img']}`
        }
        console.log(groupList);
        return {
          groupList,
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

    @Get('/groupById')
    async getGroupById(
      @QueryParam('lan') lan: string,
      @QueryParam('id') id: number,
    ) {

        const zhResult = async () => {
          const [ group ] = await this.groupService.getGroupById({id});
          return {
            ...group
          };
        }

        const enResult = async () => {
          const [ group ] = await this.groupService.getGroupEnById({id});
          return {
            ...group
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

    @Post('/group')
    async addMember(
      @BodyParam('left') left:string,
      @BodyParam('foot') foot:string,
      @BodyParam('content') content:string,
      @BodyParam('name') name:string,
      @BodyParam('describe') descripe:string,
      @BodyParam('lan') lan:string,
      @UploadedFile('avator') avator:any,
    ){
      console.log(name);
      console.log(left);
      const zhResult = async ()=>{
        const result = await this.groupService.addMember({name,descripe,avator});
        return result;
      }
      
      const enResult = async ()=>{
        
        const result = await this.groupService.addENMember({left,foot,content,avator});
        return result;
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
  
    @Put('/group')
    async updateGroup(
      @BodyParam('id') id:number,
      @BodyParam('name') name:string,
      @BodyParam('describe') descripe:string,
      @BodyParam('lan') lan:string,
      @UploadedFile('avator') avator:any,
      @BodyParam('left') left:string,
      @BodyParam('foot') foot:string,
      @BodyParam('content') content:string
    ){
      console.log(left);
      const zhResult = async ()=>{
        const result = await this.groupService.updateGroup({id,name,descripe,avator});
        return result;
      }

      const enResult = async ()=>{
        const result = await this.groupService.updateEnGroup({id,left,foot,content,avator});
        return result;
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

    @Delete('/group')
    async deleteMember(
      @BodyParam('id') id:number,
      @BodyParam('lan') lan:string
    ){
      const zhResult = async ()=>{
        const [ member ] = await this.groupService.getGroupById({id});
        const result = await this.groupService.deleteMember(member);
        return result;
      }

      const enResult = async ()=>{
        const result = await this.groupService.deleteENMember({id});
        return result;
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