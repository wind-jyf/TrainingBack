import { Service } from 'typedi';
import { getRepository, FindConditions } from 'typeorm';
import { DataEntity, ImgEntity } from '../data/entity';

import { isProduction } from '@/constants';
const mysql = require('mysql');
const config = isProduction ? require('@/config/proconfig') : require('@/config/devconfig');
const conn = mysql.createConnection(config);
const fs = require('fs');
const Path = require('path');

@Service()
export class CategoryService {
    private DataRepository = getRepository(DataEntity);
    private ImgRepository = getRepository(ImgEntity);

    async getImgCategory(conditions: FindConditions<ImgEntity>) {
        const { type, Year_item } = conditions;
        const result = await this.ImgRepository
            .createQueryBuilder("data")
            .where("data.type=:type", { type })
            .andWhere("data.Year_item=:Year_item", { Year_item })
            .getMany();
        return result;
    }

    async getDataCategory(conditions: FindConditions<DataEntity>) {
        const { type, Year_item } = conditions;
        const result = await this.DataRepository
            .createQueryBuilder("data")
            .where("data.type=:type", { type })
            .andWhere("data.Year_item=:Year_item", { Year_item })
            .getMany();
        return result;
    }
}

export const getCategoryData = (table: string, category: string) => {
    const promise = new Promise((resolve, reject) => {
        let sql = "select distinct " + category + " from " + table;
        conn.query(sql, (err: any, res: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
    // 异步返回查询结果
    promise.then(function (value) {
        return value;
        // success
    }, function (err) {
        throw err;
    });
    return promise;
}

export const getNextPath = async (path: string) => {
    let newPath = Path.join(path, await getDir(path)[0]);
    if (fs.lstatSync(newPath).isDirectory()) {
        return newPath;
    } else {
        return null;
    }
}

const getDir: any = async (path: string) => {
    const dir = await fs.promises.opendir(path);
    const dirName = [];

    for await (const dirent of dir) {
        if (dirent.isDirectory()) {
            dirName.push(dirent.name);
        }
    }
    return dirName;
}

async function helpDirData(res: object[], path: string) {
    let dir = await fs.promises.opendir(path);
    for await (let dirent of dir) {
        if(await fs.lstatSync(Path.join(path, dirent.name)).isDirectory()){
            res.push(await getDir(path));
            await helpDirData(res, Path.join(path, dirent.name));
        }
        return;
    }
}
export const getDirData = async (path: string) => {
    let res: any = [];
    await helpDirData(res, path);
    return res;
}