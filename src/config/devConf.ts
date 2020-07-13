/*
 * @LastEditors: panda_liu
 * @LastEditTime: 2020-07-13 12:14:31
 * @FilePath: \TrainingBack\src\config\devConf.ts
 * @Description: add some description
 */ 
import { IConfig } from './interface';
import { DEV_SERVER_PORT, DEV_SERVER_HOSTNAME } from '@/constants';

export const devConfig: IConfig = {
        port: DEV_SERVER_PORT,
        hostname: DEV_SERVER_HOSTNAME,
        mysql: {
                host: "localhost",
                port: 3306,
                username: "root",
                password: "",
                database: "dnutest",
        }
}