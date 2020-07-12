import { Service } from 'typedi';
import { getConnection, getRepository } from 'typeorm';
import { DataEntity, ImgEntity, FileEntity } from './entity';
import { isProduction } from '@/constants';
import { objectUtils } from '@/utils';
const fs = require('fs');
const mysql = require('mysql');
const config = isProduction ? require('../../../config/proconfig') : require('../../../config/devconfig');
const connection = mysql.createConnection(config);

const DATA_PATH = '../Crophe/';

@Service()
export class CategoryService {
    async getDataCategory(type: any) {
        return await getRepository(DataEntity)
            .createQueryBuilder("data")
            .where("data.type = :type", type)
            .getMany();
    }

    async getImageCategory(type: any) {
        return await getRepository(ImgEntity)
            .createQueryBuilder("img")
            .where("img.type = :type", type)
            .getMany();
    }

    async createDataCategory(conditions: any) {
        return await getConnection()
            .createQueryBuilder()
            .insert()
            .into(DataEntity)
            .values(conditions)
            .execute();
    }

    async createImageCategory(conditions: any) {
        return await getConnection()
            .createQueryBuilder()
            .insert()
            .into(ImgEntity)
            .values(conditions)
            .execute();
    }

    async deleteDataCategory(id: any) {
        return await getConnection()
            .createQueryBuilder()
            .delete()
            .from(DataEntity)
            .where("id = :id", id)
            .execute();
    }

    async deleteImageCategory(id: any) {
        return await getConnection()
            .createQueryBuilder()
            .delete()
            .from(ImgEntity)
            .where("id = :id", id)
            .execute();
    }

    async updateDataCategory(id: any, conditions: any) {
        return await getConnection()
            .createQueryBuilder()
            .update(DataEntity)
            .set(conditions)
            .where("id = :id", id)
            .execute();
    }

    async updateImageCategory(id: any, conditions: any) {
        return await getConnection()
            .createQueryBuilder()
            .update(ImgEntity)
            .set(conditions)
            .where("id = :id", id)
            .execute();
    }

}

@Service()
export class FileService {
    async getDir(path: string) {
        const dir = await fs.promises.opendir(path);
        const dirName = [];

        for await (const dirent of dir) {
            if (dirent.isDirectory()) {
                dirName.push(dirent.name);
            }
        }
        return dirName;
    }

    async getFile(path: string) {
        const dir = await fs.promises.opendir(path);
        const fileName = [];

        for await (const dirent of dir) {
            if (dirent.isFile()) {
                fileName.push(dirent.name);
            }
        }
        return fileName;
    }

    async getFileList(conditions: any, pagination?: any) {
        return await getRepository(FileEntity)
            .findAndCount(objectUtils.clean({
                ...conditions,
                ...pagination
            }))
    }

    async uploadFile(conditions: any) {
        const { name, date, file } = conditions;
        const value = {
            name,
            path: `data/${file.originalname}`,
            date,
        }
        await fs.writeFile(`${DATA_PATH}data/${file.originalname}`, file.buffer, (err: any) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('写入成功');
            }
        })
        return await getConnection()
            .createQueryBuilder()
            .insert()
            .into(FileEntity)
            .values(value)
            .execute();
    }

    async deleteFile(conditions: any) {
        const { id, path } = conditions;
        await fs.unlink(`${DATA_PATH}${path}`, (err: any) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('删除成功');
            }
        })
        return await getConnection()
            .createQueryBuilder()
            .delete()
            .from(FileEntity)
            .where("id = :id", { id })
            .execute();
    }
}

export const getData: any = (conditions: any) => {
    const promise = new Promise((resolve, reject) => {
        const _year = conditions.Year_item.replace('-', '_');
        const table: string = `data_${conditions.type}_${_year}`;
        const getColumnsSql = `select COLUMN_NAME from information_schema.COLUMNS where table_name = '${table}'`;
        connection.query(getColumnsSql, (err: any, result: any) => {
            if (err) {
                console.log('outside:' + err.message);
            } else {
                const lastKey: string = Object.keys(conditions)[Object.keys(conditions).length - 1];
                const lastData: string = conditions[lastKey];
                let whereSql: string = "";
                let getDataSql: string = "";
                for (let i in conditions) {
                    if (i !== 'Year_item' && i !== 'type' && i !== lastKey) {
                        whereSql += `and ${i}='${conditions[i]}'`;
                    }
                }
                if (lastData === 'all') {
                    getDataSql = `select * from ${table} where Year_item='${conditions.Year_item}' ${whereSql}`;
                } else {
                    let selectSql: string = "";
                    result.forEach((item: any) => {
                        if (item.COLUMN_NAME.indexOf(lastData) === 0) {
                            selectSql += `,${item.COLUMN_NAME}`;
                        }
                    })
                    getDataSql = `select Year_item${selectSql} from ${table} where Year_item='${conditions.Year_item}' ${whereSql}`;
                    console.log(getDataSql);
                }
                connection.query(getDataSql, (err: any, res: any) => {
                    if (err) {
                        console.log('inside' + err.message);
                    } else {
                        resolve(res);
                    }
                })
            }
        })
    })
    // 异步返回查询结果
    promise.then(function (value) {
        return value;
        // success
    }, function (value) {
        // failure
    });
    return promise;
}
