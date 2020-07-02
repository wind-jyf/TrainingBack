/*
 * @description: before start app
 * @author: dujiawei
 * @Date: 2019-12-09 21:53:01
 */

import { createConnection } from 'typeorm';
import { config } from './config';

export async function beforeStart() {
  return createConnection({
      ...JSON.parse(JSON.stringify(config.mysql)), // typeORM/MySQL 对配置做了修改
      type: 'mysql',
      entities: [__dirname + '/app/modules/**/entity.ts', __dirname + '/app/modules/**/entity.js'],
    })
}
