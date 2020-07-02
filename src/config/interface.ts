import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export interface IConfig {
    port: number,
    hostname: string,
    mysql: Partial<MysqlConnectionOptions>
}