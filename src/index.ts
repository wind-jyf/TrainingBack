import "reflect-metadata";
import './alias';

import Koa from 'koa';
import { Container } from 'typedi';
import { useKoaServer, useContainer } from "routing-controllers";

import { config } from '@/config';
import { beforeStart } from '@/beforeStart';
import { sessionMiddleware } from '@/app/middlewares/session';
import { staticMiddleware } from '@/app/middlewares/static';
import { templateMiddleware } from '@/app/middlewares/template';

async function startKoaServer() {
    useContainer(Container);
  
    const app = new Koa();
    useKoaServer(app, {
      controllers: [__dirname + '/app/modules/**/controller.ts', __dirname + '/app/modules/**/controller.js'],
    });
    
        //../../Crophe/WebRoot
    staticMiddleware(app,'../Crophe');
    templateMiddleware(app);
    app.use(sessionMiddleware(app));

    app.listen(config.port, config.hostname);
  
    console.log(`starting listening: ${config.hostname}:${config.port}`);
  }
  
  (async () => {
    await beforeStart();
  
    startKoaServer();
  })();