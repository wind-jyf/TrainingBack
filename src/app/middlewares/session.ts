/*
 * @description: session
 * @author: dujiawei
 * @Date: 2020-05-06 15:21:17
 */

import Koa from 'koa'
import session from 'koa-session';

const SESSION_CONFIG = {
    key: 'koa.sess', 
    maxAge: 259200000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
    secure: false,
    sameSite: false,
}

const COOKIE_SIGNED_KEY = 'slimshay'

export const sessionMiddleware = (app:Koa) => {
    app.keys = [COOKIE_SIGNED_KEY]
    return session(SESSION_CONFIG, app)
}