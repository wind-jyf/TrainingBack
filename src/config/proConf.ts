import { IConfig } from './interface';
import { PRO_SERVER_PORT, PRO_SERVER_HOSTNAME } from '@/constants';

export const proConfig : IConfig = {
    port: PRO_SERVER_PORT,
    hostname: PRO_SERVER_HOSTNAME,
    mysql: {
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "dnucleomeorg"
    }
}