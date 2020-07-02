/*
 * @description: middleware to format response
 * @author: dujiawei
 * @Date: 2020-04-30 20:36:17
 */

import { KoaMiddlewareInterface } from 'routing-controllers';

import { IContext } from '@/interface';

export class FormatResponse implements KoaMiddlewareInterface {
  async use(context: IContext, next: (err?: any) => Promise<void>) {
    let body;
    try {
      await next();

      body = context.body;

      if (context.status !== 200) {
        throw body;
      } else if (!body.hasOwnProperty('code')) {
        context.body = {
          code: 0,
          data: body
        };
      }
    } catch (e) {
      if (e instanceof Error) {

        context.body = {
          code: -1,
          message: e.message || e.name
        };
      } else {
        context.body = {
          code: -1,
          message: e || context.message || context.status
        };
      }
    }

    context.status = 200;
  }
}
