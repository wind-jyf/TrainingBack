/*
 * @description: template
 * @author: dujiawei
 * @Date: 2020-05-06 15:21:17
 */

import Koa from 'koa';
import send from 'koa-send';

const NOT_TEMPLATE_PATH = ['/api/crophe']

export const templateMiddleware = (app:Koa) => {
    app.use(async (ctx, next) => {
        const { path } = ctx;
        if(!NOT_TEMPLATE_PATH.some((item) => path.includes(item))) {
            await send(ctx, 'index.html', { root: '../Crophe' })
        }
        await next();
    })
}