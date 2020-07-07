import { Service } from 'typedi';
import { getRepository, FindManyOptions } from 'typeorm';
import { ArticleEntity } from './entity';

import { objectUtils } from '@/utils';
const fs = require('fs');

@Service()
export class ArticleService {
    private ArticleRepository = getRepository(ArticleEntity);

    async getArticleAndCount(conditions: FindManyOptions<ArticleEntity>, pagination?: { skip?: number; take?: number }) {
        return this.ArticleRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async addArticle(conditions:any){
        try{
            let {name,date,language,file} = conditions;
            if(file){
                let time = (new Date()).valueOf();
                let suffix = file.originalname.split('.').pop();
                fs.writeFile(`../Crophe/article/${time}.${suffix}`,file.buffer,(err:any)=>{
                    if(err){
                        throw new Error("写入失败" +err)
                    }else{
                        console.log("保存成功")
                    }
                })
                let path = `article/${time}.${suffix}`;
                this.ArticleRepository.insert({name,path,date,language});
            }else{
                this.ArticleRepository.insert({name,date,language});
            }
            return '添加成功'
        }catch(e){
            throw new Error("添加失败");
        }
    }

    async deleteArticle(conditions:any){
        try{
            this.ArticleRepository.remove(conditions);
            return "删除成功"
        } catch(e){
            throw new Error("删除失败")
        }
    }
}