import { Service } from 'typedi';
import { getRepository, FindConditions, FindManyOptions } from 'typeorm';
import { GroupEntity, GroupEnEntity } from './entity';

import { objectUtils } from '@/utils';
const fs = require('fs');

@Service()
export class GroupService {
    private GroupRepository = getRepository(GroupEntity);
    private GroupEnRepository = getRepository(GroupEnEntity);

    async getGroupAndCount(conditions: FindManyOptions<GroupEntity>, pagination?: { skip?: number; take?: number }) {
        return this.GroupRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async getGroupById(conditions: FindConditions<GroupEntity>) {
        return this.GroupRepository.find(objectUtils.clean({ ...conditions }))
    }

    async getGroupEnAndCount(conditions: FindManyOptions<GroupEntity>, pagination?: { skip?: number; take?: number }) {
        return this.GroupEnRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async getGroupEnById(conditions: FindConditions<GroupEntity>) {
        return this.GroupEnRepository.find(objectUtils.clean({ ...conditions }))
    }

    async addMember(conditions:any){
        try{
            let {name,descripe,avator} = conditions;
            fs.writeFile(`../Crophe/teacher/${avator.originalname}`,avator.buffer,(err:any)=>{
                if(err){
                    throw new Error("写入失败" +err)
                }else{
                    console.log("保存成功")
                }
            })
            let img = `teacher/${avator.originalname}`;
            this.GroupRepository.insert({name,img,descripe});
            return '添加成功'
        }catch(e){
            throw new Error("添加失败");
        }
        
    }

    async addENMember(conditions:any){
        
    }

    async updateGroup(conditions:any){
        try{
            console.log(conditions);
            let {id,name,descripe,avator} = conditions;
            fs.writeFile(`../Crophe/teacher/${name}`,avator.buffer,(err:any)=>{
                if(err){
                    throw new Error("写入失败" +err)
                }else{
                    console.log("保存成功")
                }
            })
            let img = `teacher/${name}`;
            this.GroupRepository.update(id,{name,img,descripe});
            return '更新成功'
        }catch(e){
            throw new Error("更新失败");
        }
    }

    async updateEnGroup(conditions:any){

    }

    async deleteMember(conditions:any){
        try{
            this.GroupRepository.remove(conditions);
            return "删除成功"
        } catch(e){
            throw new Error("删除失败")
        }
    }

    async deleteENMember(conditions:any){
        
    }
}