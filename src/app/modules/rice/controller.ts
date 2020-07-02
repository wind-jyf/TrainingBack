import {
    Get,
    QueryParam,
    Controller,
    UseBefore,
  } from 'routing-controllers';
  import { FormatResponse } from '@/app/middlewares/formatResponse';

  import { FileService, TableColumnService, riceDataService } from './service'
  
  const PICTURES_PATH = '../Crophe/data/pictures';

  @Controller('/api/crophe')
  @UseBefore(FormatResponse)
  export class PermissionController {
      
    constructor(
        private fileService: FileService, 
        private tableService: TableColumnService, 
        private riceDataService: riceDataService,
        ) {}

      //QzWy
      @Get('/accessionIdQzWYList')
      async getAccessionIdQzWyList(
          @QueryParam('year') year: string,
      ) {
        const dirName = await this.fileService.getDir(`${PICTURES_PATH}/rice/${year}`)
        const ids = dirName.sort().reduce((arr, name, index) => {
            arr.push({
                id: name
            });
            return arr;
        }, [] as any);
          return ids;
      }

      @Get('/imgQzWyList')
      async getQzWyImgList(
          @QueryParam('year') year: string,
          @QueryParam('id') id: string,
      ) {
        const fileName = await this.fileService.getFile(`${PICTURES_PATH}/rice/${year}/${id}`)
        const pictures = fileName.reduce((arr, name, index) => {
            arr.push({
                path: `data/pictures/rice/${year}/${id}/${name}`
            });
            return arr;
        }, [] as any);
          return pictures;
      }

      //RlxWy
      @Get('/accessionIdRlxWyList')
      async getAccessionIdRlxWyList(
          @QueryParam('year') year: string,
          @QueryParam('condition') condition: string,
      ) {
          const handleDrought = async (year: string, condition: string) => {
            const path = `${PICTURES_PATH}/rice/drought/${condition}/${condition}_${year}`;
            const defaultPath = `${PICTURES_PATH}/rice/drought/After_recovery/After_recovery_${year}`;
            const dirName = await this.fileService.getDir(condition === "*" || !condition ? defaultPath : path);
            const conditionName = await this.fileService.getDir(`${PICTURES_PATH}/rice/drought`);

            const ids = dirName.sort().reduce((arr, name, index) => {
                arr.push({
                    id: name
                });
                return arr;
            }, [] as any);
            
            const conditionResult = conditionName.reduce((arr, name, index) => {
                arr.push({
                    value: name,
                    name: name.split('_').join(' ')
                });
                return arr;
            }, [] as any);
            
            return {
                id: ids,
                condition: [{
                    value: '*',
                    name: 'all'
                }].concat(conditionResult) 
            };
          };

          const handleWue = async (year: string) => {
              const path = `${PICTURES_PATH}/rice/wue/${year}`;
              const dirName = await this.fileService.getDir(path);

              const growStage = [
                {
                    value: '*',
                    name: 'all'
                }];

                for(let i = 1; i <= 30; i++) {
                    growStage.push({
                        value: String(i),
                        name: String(i)
                    })
                }

              const conditionResult = [
                {
                    value: '*',
                    name: 'all'
                },{
                    value: 'W1',
                    name: 'W1'
                },{
                    value: 'W2',
                    name: 'W2'
                },{
                    value: 'N1',
                    name: 'N1'
                },{
                    value: 'N2',
                    name: 'N2'
                }];

              const ids = dirName.sort().reduce((arr, name, index) => {
                arr.push({
                    id: name
                });
                return arr;
            }, [] as any);
            
            return {
                id: ids,
                condition: conditionResult,
                growStage
            };
          };

          const handlePlot = async (year: string) => {
            const dirName = await this.fileService.getDir(`${PICTURES_PATH}/rice/plot/${year}`)
            const ids = dirName.sort().reduce((arr, name, index) => {
                arr.push({
                    id: name
                });
                return arr;
            }, [] as any);
              return {
                  id: ids
              };
          };

          const handleTiller = async (year: string) => {
            const dirName = await this.fileService.getDir(`${PICTURES_PATH}/rice/tiller/${year}`)
            const ids = dirName.sort().reduce((arr, name, index) => {
                arr.push({
                    id: name
                });
                return arr;
            }, [] as any);
              return {
                  id: ids
              };
          };

          switch(year) {
              case '2016-drought':
              case '2013-drought':
                return handleDrought(year, condition);
              case '2013-WUE':
              case '2014-WUE':
                  return handleWue(year);
              case '2015-tiller':
                  return handleTiller(year);
              case '2016-plot':
                  return handlePlot(year);
              default: 
                  return null;
          }
      }

      @Get('/imgRlxWyList')
      async getImgRlxWyList(
          @QueryParam('year') year: string,
          @QueryParam('condition') condition: string,
          @QueryParam('id') id: string,
          @QueryParam('growStage') growStage: string,
      ) {
          const handleDrought = async (year: string, condition: string) => {
              if(condition === "*") {
                const path_before_stress = `${PICTURES_PATH}/rice/drought/Before_stress/Before_stress_${year}/${id}`;
                const path_after_stress = `${PICTURES_PATH}/rice/drought/After_stress/After_stress_${year}/${id}`;
                const path_after_recovery = `${PICTURES_PATH}/rice/drought/After_recovery/After_recovery_${year}/${id}`;

                const fileNameBeforeStress = await this.fileService.getFile(path_before_stress);
                const fileNameAfterStress = await this.fileService.getFile(path_after_stress);
                const fileNameAfterRecovery = await this.fileService.getFile(path_after_recovery);

                const picturesBeforeStress = fileNameBeforeStress.reduce((arr, name, index) => {
                    arr.push({
                        path: `data/pictures/rice/drought/Before_stress/Before_stress_${year}/${id}/${name}`
                    });
                    return arr;
                }, [] as any);
                const picturesAfterStress = fileNameAfterStress.reduce((arr, name, index) => {
                    arr.push({
                        path: `data/pictures/rice/drought/After_stress/After_stress_${year}/${id}/${name}`
                    });
                    return arr;
                }, [] as any);
                const picturesAfterRecovery = fileNameAfterRecovery.reduce((arr, name, index) => {
                    arr.push({
                        path: `data/pictures/rice/drought/After_recovery/After_recovery_${year}/${id}/${name}`
                    });
                    return arr;
                }, [] as any);


                return [...picturesBeforeStress, ...picturesAfterStress, ...picturesAfterRecovery];

              } else {
                const path = `${PICTURES_PATH}/rice/drought/${condition}/${condition}_${year}/${id}`;
                const fileName = await this.fileService.getFile(path);
                const pictures = fileName.reduce((arr, name, index) => {
                  arr.push({
                      path: `data/pictures/rice/drought/${condition}/${condition}_${year}/${id}/${name}`
                  });
                  return arr;
              }, [] as any);
                return pictures;
              }
          };

          const handleWue = async (year: string) => {
            const path = `${PICTURES_PATH}/rice/wue/${year}/${id}`;

            const fileName = await this.fileService.getFile(path);

            const filteredFileName = fileName.filter((name) => {
                const prefix = name.split('.')[0];
                const id_condition = prefix.split('_')[0];
                const grow_stage = prefix.split('_')[1];
                if(condition === "*" && growStage === "*") {
                    return true;
                } else if(condition !== "*" && growStage === "*") {
                    return `${id}${condition}` === id_condition;
                } else if (condition === "*" && growStage !== "*") {
                    return growStage === grow_stage;
                } else {
                    return `${id}${condition}` === id_condition && growStage === grow_stage
                }
            });
            const pictures = filteredFileName.reduce((arr, name, index) => {
                arr.push({
                    path: `data/pictures/rice/wue/${year}/${id}/${name}`
                });
                return arr;
            }, [] as any);
                return pictures;                
          };

          const handlePlot = async (year: string) => {
            const fileName = await this.fileService.getFile(`${PICTURES_PATH}/rice/plot/${year}/${id}`)
            const pictures = fileName.reduce((arr, name, index) => {
                arr.push({
                    path: `data/pictures/rice/plot/${year}/${id}/${name}`
                });
                return arr;
            }, [] as any);
              return pictures;
          };

          const handleTiller = async (year: string) => {
            const fileName = await this.fileService.getFile(`${PICTURES_PATH}/rice/tiller/${year}/${id}`)
            const pictures = fileName.reduce((arr, name, index) => {
                arr.push({
                    path: `data/pictures/rice/tiller/${year}/${id}/${name}`
                });
                return arr;
            }, [] as any);
              return pictures;
          };

          switch(year) {
              case '2016-drought':
              case '2013-drought':
                return handleDrought(year, condition);
              case '2013-WUE':
              case '2014-WUE':
                  return handleWue(year);
              case '2015-tiller':
                  return handleTiller(year);
              case '2016-plot':
                  return handlePlot(year);
              default: 
                  return handleDrought(year, condition);
          }
      }

      //data
      @Get('/riceDataId')
      async getRiceDataId (
        @QueryParam('year') year: string
      ) {
        const year_table_map = {
            '2016-drought': 'phenotypic data_2016',
            '2013-drought': 'phenotypic data 2013',
            '2013-WUE': 'data_wue',
            '2014-WUE': 'data_wue',
            '2015-tiller': 'data_tiller'
        } as any;

        const handleDrought2013 = async (year: string) => {
            const excludeColumn = ['drought_year', 'Phenotype ID', 'Corresponding genotype ID'];

            let columns = await this.tableService.getColumn({
                select: ['COLUMN_NAME'],
                where: {TABLE_NAME: year_table_map[year]}
            });
            let id = await this.riceDataService.getDrought2013Id({select:['Phenotype ID']})

            id = id.reduce((arr, item, index) => {
                arr.push({
                    value: item['Phenotype ID'],
                    name: item['Phenotype ID']
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

        const handleDrought2016 = async (year: string) => {
            const excludeColumn = ['Accession_2013ID'];

            let columns = await this.tableService.getColumn({
                select: ['COLUMN_NAME'],
                where: {TABLE_NAME: year_table_map[year]}
            });

            let id = await this.riceDataService.getDrought2016Id({select:['Accession_2013ID']});

            id = id.reduce((arr, item, index) => {
                arr.push({
                    value: item.Accession_2013ID,
                    name: item.Accession_2013ID
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

        const handleWue = async (year: string) => {    
            const excludeColumn = ['dyear', 'num_id', 'Growth_stage'];

            let columns = await this.tableService.getColumn({
                select: ['COLUMN_NAME'],
                where: {TABLE_NAME: year_table_map[year]}
            });

            columns = columns.filter((item) => !excludeColumn.includes(item.COLUMN_NAME)).reduce((arr, trait, index) => {
                arr.push({
                    value: trait.COLUMN_NAME,
                    name: trait.COLUMN_NAME
                });
                return arr;
            }, [{value: '*', name: 'all'}] as any);

            let id = await this.riceDataService.getWueId({aliasName: 'wue', distinctName: 'num_id', year});
            id = id.reduce((arr, trait, index) => {
                arr.push({
                    value: trait.num_id,
                    name: trait.num_id
                });
                return arr;
            }, [] as any);

            let growStage = await this.riceDataService.getWueId({aliasName: 'wue', distinctName: 'Growth_stage', year});
            growStage = growStage.reduce((arr, trait, index) => {
                arr.push({
                    value: trait.Growth_stage,
                    name: trait.Growth_stage
                });
                return arr;
            }, [{value: 0, name: 'all'}] as any);
            
            return {
                id,
                growStage,
                trait: columns
            }
        };

        const handleTiller = async (year: string) => {
            const excludeColumn = ['year', 'number'];

            let columns = await this.tableService.getColumn({
                select: ['COLUMN_NAME'],
                where: {TABLE_NAME: year_table_map[year]}
            });

            columns = columns.filter((item) => !excludeColumn.includes(item.COLUMN_NAME)).reduce((arr, trait, index) => {
                arr.push({
                    value: trait.COLUMN_NAME,
                    name: trait.COLUMN_NAME
                });
                return arr;
            }, [{value: '*', name: 'all'}] as any);

            let id = await this.riceDataService.getTillerId({
                where:{year}
            });
            id = id.reduce((arr, trait, index) => {
                arr.push({
                    value: trait.number,
                    name: trait.number
                });
                return arr;
            }, [] as any);

            return {
                id,
                trait: columns
            }
        };

        switch(year) {
            case '2013-drought':
              return handleDrought2013(year);
            case '2016-drought':
              return handleDrought2016(year);
            case '2013-WUE':
            case '2014-WUE':
                return handleWue(year);
            case '2015-tiller':
                return handleTiller(year);
            default: 
                return handleDrought2013(year);
        }
      }

      @Get('/riceData')
      async getRiceData (
        @QueryParam('year') year: string,
        @QueryParam('id') id: string,
        @QueryParam('growStage') growStage: number,
        @QueryParam('trait') trait: string
      ) {
        
        const handleDrought2013 = async (id:string, trait:string) => {
            const excludeFiled = ['drought_year', 'Phenotype ID', 'Corresponding genotype ID'];

            let data = await this.riceDataService.getDrought2013Data({
                id, 
                trait,
                aliasName: 'rice'
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

        const handleDrought2016 = async (id:string, trait:string) => {
            const excludeFiled = ['Accession_2013ID', 'drought_year'];

            let data = await this.riceDataService.getDrought2016Data({
                id, 
                trait,
                aliasName: 'rice'
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

        const handleWue = async (id:string, trait:string, growStage:number, year:string) => {
            const excludeFiled = ['dyear', 'num_id'];

            let data = await this.riceDataService.getWueData({
                id, 
                trait,
                year,
                growStage,
                aliasName: 'rice'
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

        const handleTiller = async (id:string, trait:string) => {
            const excludeFiled = ['year', 'number'];

            let data = await this.riceDataService.getTillerData({
                id, 
                trait,
                aliasName: 'rice'
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
            case '2013-drought':
              return handleDrought2013(id, trait);
            case '2016-drought':
              return handleDrought2016(id, trait);
            case '2013-WUE':
            case '2014-WUE':
                return handleWue(id, trait, growStage, year);
            case '2015-tiller':
                return handleTiller(id, trait);
            default: 
                return handleDrought2013(id, trait);
        }
      }
  }