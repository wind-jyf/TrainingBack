import {
    Get,
    Post,
    BodyParam,
    Controller,
    Ctx,
    UseBefore
  } from 'routing-controllers';
  import { IContext } from '@/interface';
  import { FormatResponse } from '@/app/middlewares/formatResponse';

  import { userService } from './service';


  @Controller('/api/crophe')
  @UseBefore(FormatResponse)
  export class UserController {
      constructor(private userService: userService) {}

      @Post('/login')
      async login(
        @Ctx() ctx: IContext,
        @BodyParam('username') username: string,
        @BodyParam('password') password: string
      ) {

          const result = await this.userService.getUser({username, password});

          if (result.length === 0) {
            throw '账号或密码错误';
          }

          const { username:userName, id, userrole } = result[0]

          ctx.session = {
            ...ctx.session,
            role: userrole,
            username: userName,
            id
          }
          
          return {
            role: userrole,
            username: userName,
            id
          }
      }

      @Get('/check_login')
      async checkLogin(
        @Ctx() ctx: IContext,
      ) {
        const { id, role, username } = ctx.session;
        return {
          login: Boolean(id),
          role,
          username
        }
      }

      @Get('/logout')
      async logOut(
        @Ctx() ctx: IContext,
      ) {
        
        let ctxCop = ctx as any;
        ctxCop.session = null;

        return {
          message: 'logout'
        }
      }
  }