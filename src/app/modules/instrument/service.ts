import { Service } from 'typedi';
import { getRepository, FindConditions, FindManyOptions } from 'typeorm';
import { InstrumentEntity, InstrumentEnEntity } from './entity';

import { objectUtils } from '@/utils';
const fs = require('fs');

@Service()
export class InstrumentService {
    private InstrumentRepository = getRepository(InstrumentEntity);
    private InstrumentEnRepository = getRepository(InstrumentEnEntity);

    async getInstrumentAndCount(conditions: FindManyOptions<InstrumentEntity>, pagination?: { skip?: number; take?: number }) {
        return this.InstrumentRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async getInstrumentById(conditions: FindConditions<InstrumentEntity>) {
        return this.InstrumentRepository.find(objectUtils.clean({ ...conditions }))
    }

    async getInstrumentEnAndCount(conditions: FindManyOptions<InstrumentEnEntity>, pagination?: { skip?: number; take?: number }) {
        return this.InstrumentEnRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async getInstrumentEnById(conditions: FindConditions<InstrumentEnEntity>) {
        return this.InstrumentEnRepository.find(objectUtils.clean({ ...conditions }))
    }

    async getImg(content: any){
        let imgsrc=[];
        const str = /<img\b.*?(?:\>|\/>)/gi;
        const str1 = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
        let image = content.match(str);
        for(let i = 0;i<image.length;i++){
            imgsrc[i] = image[i].match(str1)[1];
        }
        return imgsrc;
    }
    async setImg(content:any,imgsrc:any,replacestr:any){
        for(let i = 0;i<imgsrc.length;i++){
            content = content.replace(imgsrc[i],replacestr[i])
        }
        return content;
    }

    async addInstrument(conditions:any){
        try{
            let {name,content} = conditions;
            let imageStr = await this.getImg(content);
            let replacestr:any[] = [];
            for(let i =0;i<imageStr.length;i++){
                let base64Data = imageStr[i].replace(/^data:image\/\w+;base64,/, "");
                console.log(base64Data);
                let dataBuffer = new Buffer(base64Data,'base64');
                fs.writeFile(`../Crophe/instument/${name}.png`,dataBuffer,(err:any)=>{
                    if(err){
                        throw new Error("写入失败" +err)
                    }else{
                        console.log("保存成功")
                    }
                })
                replacestr.push(`/instument/${name+i}.png`);
                console.log(replacestr);
            }
            content = await this.setImg(content,imageStr,replacestr);
            conditions.content = content;
            this.InstrumentRepository.insert(conditions);
            return "添加成功"
        } catch(e){
            throw new Error("添加失败");
        }
    }

    async addENInstrument(conditions:any){
        try{
            let {name,content} = conditions;
            let imageStr = await this.getImg(content);
            let replacestr:any[] = [];
            for(let i =0;i<imageStr.length;i++){
                let base64Data = imageStr[i].replace(/^data:image\/\w+;base64,/, "");
                console.log(base64Data);
                let dataBuffer = new Buffer(base64Data,'base64');
                fs.writeFile(`../Crophe/instument/${name}.png`,dataBuffer,(err:any)=>{
                    if(err){
                        throw new Error("写入失败" +err)
                    }else{
                        console.log("保存成功")
                    }
                })
                replacestr.push(`/instument/${name}.png`);
            }
            content = await this.setImg(content,imageStr,replacestr);
            conditions.content = content;
            this.InstrumentEnRepository.insert(conditions);
            return "添加成功"
        } catch(e){
            throw new Error("添加失败");
        }
    }

    async deleteInstrument(conditions:any){
        try{
            this.InstrumentRepository.remove(conditions);
            return "删除成功"
        } catch(e){
            throw new Error("删除失败")
        }
    }
    async deleteENInstrument(conditions:any){
        try{
            this.InstrumentEnRepository.remove(conditions);
            return "删除成功"
        } catch(e){
            throw new Error("删除失败")
        }
    }
}