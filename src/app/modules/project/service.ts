import { Service } from 'typedi';
import { getRepository, FindManyOptions } from 'typeorm';
import { ProjectEntity } from './entity';

import { objectUtils } from '@/utils';

@Service()
export class ProjectEntityService {
    private ProjectEntityRepository = getRepository(ProjectEntity);

    async getProjectEntityAndCount(conditions: FindManyOptions<ProjectEntity>, pagination?: { skip?: number; take?: number }) {
        return this.ProjectEntityRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async getProjectById(conditions:any){
        return this.ProjectEntityRepository.find(objectUtils.clean({ ...conditions }));
    }

    async addProject(conditions:any){
        try{
            this.ProjectEntityRepository.insert(conditions);
            return "添加成功"
        }catch(e){
            throw new Error("添加失败");
        }
    }

    async updateProject(conditions:any){
        try{
            const {id,projectname} = conditions;
            this.ProjectEntityRepository.update(id,{projectname});
            return "更新成功"
        }catch(e){
            throw new Error("更新失败");
        }
    }

    async deleteProject(conditions:any){
        try{
            this.ProjectEntityRepository.remove(conditions);
            return "删除成功"
        } catch(e){
            throw new Error("删除失败")
        }
    }
}