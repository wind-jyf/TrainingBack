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
            let time = (new Date()).valueOf();
            let suffix = avator.originalname.split('.').pop();
            fs.writeFile(`../Crophe/teacher/${time}.${suffix}`,avator.buffer,(err:any)=>{
                if(err){
                    throw new Error("写入失败" +err)
                }else{
                    console.log("保存成功")
                }
            })
            let img = `teacher/${time}.${suffix}`;
            this.GroupRepository.insert({name,img,descripe});
            return '添加成功'
        }catch(e){
            throw new Error("添加失败");
        }
        
    }

    async addENMember(conditions:any){
        try{
            let {left,foot,content,avator} = conditions;
            let time = (new Date()).valueOf();
            let suffix = avator.originalname.split('.').pop();
            fs.writeFile(`../Crophe/teacher/${time}_e.${suffix}`,avator.buffer,(err:any)=>{
                if(err){
                    throw new Error("写入失败" +err)
                }else{
                    console.log("保存成功")
                }
            })
            let img = `teacher/${time}_e.${suffix}`;
            this.GroupEnRepository.insert({left,foot,content,img});
            return '添加成功'
        }catch(e){
            throw new Error("添加失败");
        }
    }

    async updateGroup(conditions:any){
        try{
            let {id,name,descripe,avator} = conditions;
            if(avator){
                let time = (new Date()).valueOf();
                let suffix = avator.originalname.split('.').pop();
                fs.writeFile(`../Crophe/teacher/${time}.${suffix}`,avator.buffer,(err:any)=>{
                    if(err){
                        throw new Error("写入失败" +err)
                    }else{
                        console.log("保存成功")
                    }
                })
                let img = `teacher/${time}.${suffix}`;
                this.GroupRepository.update(id,{name,img,descripe});
            }else{
                this.GroupRepository.update(id,{name,descripe});
            }
            return '更新成功'
        }catch(e){
            throw new Error("更新失败");
        }
    }

    async updateEnGroup(conditions:any){
        try{
            let {id,left,foot,content,avator} = conditions;
            if(avator){
                let time = (new Date()).valueOf();
                let suffix = avator.originalname.split('.').pop();
                fs.writeFile(`../Crophe/teacher/${time}_e.${suffix}`,avator.buffer,(err:any)=>{
                    if(err){
                        throw new Error("写入失败" +err)
                    }else{
                        console.log("保存成功")
                    }
                })
                let img = `../Crophe/teacher/${time}_e.${suffix}`;
                this.GroupEnRepository.update(id,{left,foot,content,img});
            }else{
                this.GroupEnRepository.update(id,{left,foot,content});
            }
            return '更新成功'
        }catch(e){
            throw new Error("更新失败");
        }
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
        try{
            this.GroupEnRepository.remove(conditions);
            return "删除成功"
        } catch(e){
            throw new Error("删除失败")
        }
    }
}