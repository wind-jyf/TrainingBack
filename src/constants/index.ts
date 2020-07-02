export const DEV_SERVER_PORT = 3001;
export const PRO_SERVER_PORT = 3001;

export const DEV_SERVER_HOSTNAME = 'localhost';
export const PRO_SERVER_HOSTNAME  = '122.205.95.152';

export const isProduction = process.env.NODE_ENV === 'production';

export enum LANGUAGE {
    zh = 'zh-CN',
    en = 'en-US'
}