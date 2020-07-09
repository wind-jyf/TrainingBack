import { Service } from 'typedi';
import { getRepository, FindConditions, FindManyOptions } from 'typeorm';
import { NewsEntity,NewsENEntity } from './entity';

import { objectUtils } from '@/utils';
const fs = require('fs');

@Service()
export class NewsService {
    private NewsRepository = getRepository(NewsEntity);
    private NewsENRepository = getRepository(NewsENEntity);
    async getNewsAndCount(conditions: FindManyOptions<NewsEntity>, pagination?: { skip?: number; take?: number }) {
        return this.NewsRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }
    async getENNewsAndCount(conditions: FindManyOptions<NewsEntity>, pagination?: { skip?: number; take?: number }) {
        return this.NewsENRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }
    async getNewsById(conditions: FindConditions<NewsEntity>) {
        return  this.NewsRepository.find(objectUtils.clean({ ...conditions }))
   
    }
    async getENNewsById(conditions: FindConditions<NewsEntity>) {
        return this.NewsENRepository.find(objectUtils.clean({ ...conditions }))

    }
    async getImg(content: any){
        let imgsrc:any=[];
        const str = /<img\b.*?(?:\>|\/>)/gi;
        const str1 = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
        let image = content.match(str);
        console.log(image)
        
        if(image){
            console.log("替换")
            for(let i = 0;i<image.length;i++){
                imgsrc[i] = image[i].match(str1)[1];
            }
        }
        
        console.log('okk')
        return imgsrc;
    }
    async setImg(content:any,imgsrc:any,replacestr:any){
        for(let i = 0;i<imgsrc.length;i++){
            content = content.replace(imgsrc[i],replacestr[i])
        }
        return content;
    }
    async addNews(conditions: any) {
        console.log(conditions);
        try{
            let {name,content} = conditions;
            let imageStr = [];
            imageStr = await this.getImg(content);
            let replacestr:any[] = [];
            
            if(imageStr.length!=0){
                for(let i =0;i<imageStr.length;i++){
                    let base64Data = imageStr[i].replace(/^data:image\/\w+;base64,/, "");
                    let dataBuffer = new Buffer(base64Data,'base64');
                    let time = (new Date()).valueOf();
                    fs.writeFile(`../Crophe/newsimg/${time+i})}.png`,dataBuffer,(err:any)=>{
                        if(err){
                            throw new Error("写入失败" +err) 
                        }else{
                            console.log("保存成功")
                        }
                    })
                    replacestr.push(`newsimg/${time+i})}.png`);
                    console.log(replacestr);
                }
                content = await this.setImg(content,imageStr,replacestr);
                conditions.content = content;
            }
            
            this.NewsRepository.insert(conditions);
            return "添加成功"
        } catch(e){
            throw new Error("添加失败");
        }
    }
    
    async addENNews(conditions:any){
        try{
            let {name,content} = conditions;
            this.NewsENRepository.insert({title:name,content});
            return "添加成功"
        }catch(e){
            throw new Error("添加失败");
        }
    }

    async updateNews(conditions: any) {
        try{
            const {id} = conditions;
            let {name,date,content} = conditions;
            let imageStr = await this.getImg(content);
            let replacestr:any[] = [];
            
            for(let i =0;i<imageStr.length;i++){
                let base64Data = imageStr[i].replace(/^data:image\/\w+;base64,/, "");
                let dataBuffer = new Buffer(base64Data,'base64');
                let time = (new Date()).valueOf();
                fs.writeFile(`../Crophe/newsimg/${time+i}.png`,dataBuffer,(err:any)=>{
                    if(err){
                        throw new Error("写入失败" +err)
                    }else{
                        console.log("保存成功")
                    }
                })
                replacestr.push(`newsimg/${time+i}.png`);
            }
            content = await this.setImg(content,imageStr,replacestr);
            
            this.NewsRepository.update(id,{name,date,content});
            return "更新成功"
        }catch(e){
            throw new Error("更新失败");
        }
    }

    async updateENNews(conditions:any){
        try{
            let {name,content,id} = conditions;
            this.NewsENRepository.update(id,{title:name,content});
            return "更新成功"
        }catch(e){
            throw new Error("更新失败");
        }
    }
    async deleteNews(conditions:any){
        try{
            this.NewsRepository.remove(conditions);
            return "删除成功"
        } catch(e){
            throw new Error("删除失败")
        }
    }

    async deleteENNews(conditions:any){
        try{
            this.NewsENRepository.remove(conditions);
            return "删除成功"
        } catch(e){
            throw new Error("删除失败")
        }
    }
}