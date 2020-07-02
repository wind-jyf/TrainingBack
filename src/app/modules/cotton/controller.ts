import {
    Get,
    QueryParam,
    Controller,
    UseBefore,
  } from 'routing-controllers';
  import { FormatResponse } from '@/app/middlewares/formatResponse';

  import { FileService } from '../rice/service'
  
  const PICTURES_PATH = '../Crophe/data/pictures';

  @Controller('/api/crophe')
  @UseBefore(FormatResponse)
  export class CottonController {
      
    constructor(
        private fileService: FileService,
        ) {}

      @Get('/accessionIdCottonList')
      async getAccessionIdCottonList(
          @QueryParam('year') year: string,
      ) {

        const ids = [];

        for(let i = 1; i <= 200; i++) {
            ids.push({
                value: String(i).padStart(3, '0'),
                name: String(i).padStart(3, '0')
            })
        }
        const condition = [
            {
                value: '*',
                name: 'all'
            },{
                value: 'C1',
                name: 'C1'
            },{
                value: 'C2',
                name: 'C2'
            },{
                value: 'C3',
                name: 'C3'
            },{
                value: 'D1',
                name: 'D1'
            },{
                value: 'D2',
                name: 'D2'
            },{
                value: 'D3',
                name: 'D3'
            }
        ];
        return {
            id: ids,
            condition
        }
      }

      @Get('/cottonImgList')
      async getCottonImgList(
          @QueryParam('year') year: string,
          @QueryParam('id') id: string,
          @QueryParam('condition') condition: string,
      ) {

          let fileName = await this.fileService.getFile(`${PICTURES_PATH}/cotton/${year}`);
          fileName = fileName.filter((name) => {
              if(condition === '*') {
                return name.includes(id);
              } else {
                return name.includes(id) && name.includes(condition);
              }
          })
          const pictures = fileName.reduce((arr, name, index) => {
              arr.push({
                  path: `data/pictures/cotton/${year}/${name}`
              });
              return arr;
          }, [] as any);
            return pictures;
      }
  }