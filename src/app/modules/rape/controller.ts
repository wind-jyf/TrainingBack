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
  export class RapeController {
      
    constructor(
        private fileService: FileService,
        ) {}

      @Get('/accessionIdRapeList')
      async getAccessionIdRapeList(
          @QueryParam('year') year: string,
      ) {
        const dirName = await this.fileService.getDir(`${PICTURES_PATH}/rape/${year}`)
        const ids = dirName.sort().reduce((arr, name, index) => {
            arr.push({
                id: name
            });
            return arr;
        }, [] as any);
          return ids;
      }

      @Get('/rapeImgList')
      async getRapeImgList(
          @QueryParam('year') year: string,
          @QueryParam('id') id: string,
      ) {

          const fileName = await this.fileService.getFile(`${PICTURES_PATH}/rape/${year}/${id}`)
          const pictures = fileName.reduce((arr, name, index) => {
              arr.push({
                  path: `data/pictures/rape/${year}/${id}/${name}`
              });
              return arr;
          }, [] as any);
            return pictures;
      }
  }