import {
    Get,
    QueryParam,
    Controller,
    UseBefore,
  } from 'routing-controllers';
  import { FormatResponse } from '@/app/middlewares/formatResponse';

  import { FileService, TableColumnService } from '../rice/service'
  import { maizeDataService } from './service'
  
  const PICTURES_PATH = '../Crophe/data/pictures';

  @Controller('/api/crophe')
  @UseBefore(FormatResponse)
  export class PermissionController {
      
    constructor(
        private fileService: FileService,
        private tableService: TableColumnService,
        private maizeService:  maizeDataService
        ) {}

      //mqd
      @Get('/accessionIdMqdList')
      async getAccessionIdMqdList(
          @QueryParam('year') year: string,
      ) {
        const dirName = await this.fileService.getDir(`${PICTURES_PATH}/maize/${year}`)
        const ids = dirName.sort().reduce((arr, name, index) => {
            arr.push({
                id: name
            });
            return arr;
        }, [] as any);
          return ids;
      }

      @Get('/mqdImgList')
      async getMqdImgList(
          @QueryParam('year') year: string,
          @QueryParam('id') id: string,
      ) {


        const handleOthers = async (year: string, id:string) => {
          const fileName = await this.fileService.getFile(`${PICTURES_PATH}/maize/${year}/${id}`)
          const pictures = fileName.reduce((arr, name, index) => {
              arr.push({
                  path: `data/pictures/maize/${year}/${id}/${name}`
              });
              return arr;
          }, [] as any);
            return pictures;
        };

        const handleCt = async (year: string, id:string) => {
            const CT = 'CT'
            let fileName = await this.fileService.getFile(`${PICTURES_PATH}/maize/${year}/${id}`);

            fileName = fileName.filter((name) => {
                return name.includes(CT);
            })
            const pictures = fileName.reduce((arr, name, index) => {
                arr.push({
                    path: `data/pictures/maize/${year}/${id}/${name}`
                });
                return arr;
            }, [] as any);
                return pictures;
            };

                switch(year) {
                    case '2017-maize-RGB':
                    case '2017-maize-Hyperspectru':
                    return handleOthers(year, id);
                    case '2017-maize-CT':
                        return handleCt(year, id);
                    default: 
                        return handleOthers(year, id);
                }
      }

      //jby
      @Get('/accessionIdJbyList')
      async getAccessionIdJbyList(
          @QueryParam('year') year: string,
      ) {
        const dirName = await this.fileService.getDir(`${PICTURES_PATH}/maize/${year}`)
        const ids = dirName.sort().reduce((arr, name, index) => {
            arr.push({
                id: name
            });
            return arr;
        }, [] as any);
          return ids;
      }

      @Get('/jbyImgList')
      async getJbyImgList(
          @QueryParam('year') year: string,
          @QueryParam('id') id: string,
      ) {
          const fileName = await this.fileService.getFile(`${PICTURES_PATH}/maize/${year}/${id}`)
          const pictures = fileName.reduce((arr, name, index) => {
              arr.push({
                  path: `data/pictures/maize/${year}/${id}/${name}`
              });
              return arr;
          }, [] as any);
            return pictures;

      }

      //data
      @Get('/maizeDataId')
      async getMaizeDataId (
        @QueryParam('year') year: string
      ) {
        const year_table_map = {
            '2014-maize-RIL': 'maize_ril',
            '2014-maize-GWAS': 'maize_gwas'
        } as any;

        const handleRil = async (year: string) => {
            const excludeColumn = ['RIL_year', 'RILid'];

            let columns = await this.tableService.getColumn({
                select: ['COLUMN_NAME'],
                where: {TABLE_NAME: year_table_map[year]}
            });
            let id = await this.maizeService.getRilrDataId({select:['RILid']})

            id = id.reduce((arr, item, index) => {
                arr.push({
                    value: item['RILid'],
                    name: item['RILid']
                });
                return arr;
            }, [] as any)
            
            columns = columns.filter((item) => !excludeColumn.includes(item.COLUMN_NAME)).reduce((arr, trait, index) => {
                arr.push({
                    value: trait.COLUMN_NAME,
                    name: trait.COLUMN_NAME
                });
                return arr;
            }, [{value: '*', name: 'all'}] as any);

            return {
                id,
                trait: columns
            };
        };

        const handleGwas = async (year: string) => {
            const excludeColumn = ['GWAS_year', 'GWASid', 'linename'];

            let columns = await this.tableService.getColumn({
                select: ['COLUMN_NAME'],
                where: {TABLE_NAME: year_table_map[year]}
            });

            let id = await this.maizeService.getGwasDataId({select:['GWASid']});

            id = id.reduce((arr, item, index) => {
                arr.push({
                    value: item.GWASid,
                    name: item.GWASid
                })
                return arr;
            }, [] as any)

            columns = columns.filter((item) => !excludeColumn.includes(item.COLUMN_NAME)).reduce((arr, trait, index) => {
                arr.push({
                    value: trait.COLUMN_NAME,
                    name: trait.COLUMN_NAME
                });
                return arr;
            }, [{value: '*', name: 'all'}] as any);


            return {
                id,
                trait: columns
            };
        };


        switch(year) {
            case '2014-maize-RIL':
              return handleRil(year);
            case '2014-maize-GWAS':
              return handleGwas(year);
            default: 
                return handleRil(year);
        }
      }

      @Get('/maizeData')
      async getMaizeData (
        @QueryParam('year') year: string,
        @QueryParam('id') id: string,
        @QueryParam('trait') trait: string
      ) {
        
        const handleRil = async (id:string, trait:string) => {
            const excludeFiled = ['RIL_year', 'RILid'];

            let data = await this.maizeService.getRilrData({
                id, 
                trait,
                aliasName: 'maize'
            });

            data = data.reduce((arr, item) => {
                const result = Object.keys(item).reduce((obj:any, key:any) => {
                    if(!excludeFiled.includes(key)) {
                        obj[key] = item[key];
                    }
                    return obj;
                }, {});
                arr.push(result);
                return arr;
            }, []);
            return data;
        }

        const handleGwas = async (id:string, trait:string) => {
            const excludeFiled = ['GWAS_year', 'GWASid', 'linename'];

            let data = await this.maizeService.getGwasData({
                id, 
                trait,
                aliasName: 'maize'
            });

            data = data.reduce((arr, item) => {
                const result = Object.keys(item).reduce((obj:any, key:any) => {
                    if(!excludeFiled.includes(key)) {
                        obj[key] = item[key];
                    }
                    return obj;
                }, {});
                arr.push(result);
                return arr;
            }, []);
            return data;
        }


        switch(year) {
            case '2014-maize-RIL':
              return handleRil(id, trait);
            case '2014-maize-GWAS':
              return handleGwas(id, trait);
            default: 
                return handleRil(id, trait);
        }
      }
  }