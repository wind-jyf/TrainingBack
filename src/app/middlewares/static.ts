/*
 * @description: session
 * @author: dujiawei
 * @Date: 2020-05-06 15:21:17
 */

import Koa from 'koa';
import serve from 'koa-static';

export const staticMiddleware = (app:Koa, path:string) => {
    app.use(serve(path));
}