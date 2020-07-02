import { ParameterizedContext } from 'koa';
import { Session } from 'koa-session';

export type IContext = ParameterizedContext<
  any,
  {
    session:Session
  }
>;
