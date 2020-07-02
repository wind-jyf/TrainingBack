import {
    Get,
    Put,
    QueryParam,
    Controller,
    UseBefore,
    BodyParam,
    Ctx
  } from 'routing-controllers';
  import { IContext } from '@/interface';
  import { FormatResponse } from '@/app/middlewares/formatResponse';

  import { PermissionEntityService } from './service';

  const ADMIN = 'Admin';
  const USER = 'User';
  const ADD = 'ADD';

  @Controller('/api/crophe')
  @UseBefore(FormatResponse)
  export class PermissionController {
      constructor(private permissionService: PermissionEntityService) {}

      @Get('/permissionList')
      async getPermissionList(
        @Ctx() ctx: IContext,
        @QueryParam('s_tp') s_tp: string,
        @QueryParam('s_user') s_user: string,
        @QueryParam('s_img_data') s_img_data: string,
      ) {
          const { role } = ctx.session;
          const query = role === ADMIN ? {s_tp, s_user, s_img_data} : {s_authorize: USER, s_tp, s_user, s_img_data};

          const permissionList = await this.permissionService.getPermission(query);
          return permissionList;

      }

      @Get('/authorizationList')
      async getAuthorizationList(
        @QueryParam('s_tp') s_tp: string,
        @QueryParam('s_img_data') s_img_data: string,
      ) {

          const list = await this.permissionService.getPermission({s_tp, s_img_data});

          const ownList = list.filter((item) => item.s_authorize === USER);
          const allList = list;
          return {
            ownList,
            allList
          };
      }

      @Put('/updateAuth')
      async updateAuth(
        @BodyParam('s_year') s_year: string,
        @BodyParam('s_tp') s_tp: string,
        @BodyParam('s_img_data') s_img_data: string,
        @BodyParam('purpose') purpose: string,
      ) {
        const result = await this.permissionService.updatePermission({
          s_year, s_tp, s_img_data
        },{
          s_authorize: purpose === ADD ? USER : ADMIN
        });
        return {}
      }
 }