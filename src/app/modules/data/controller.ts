import {
    Get,
    Post,
    QueryParam,
    BodyParam,
    Controller,
    UseBefore
} from 'routing-controllers';
import { FormatResponse } from '@/app/middlewares/formatResponse';

import { CategoryService } from './service';
import { FileService } from '../rice/service';
import { getData } from './service';

const PICTURES_PATH = '../Crophe/data/pictures';

@Controller('/api/crophe')
@UseBefore(FormatResponse)
export class CategoryController {

    constructor(
        private fileService: FileService,
        private categoryService: CategoryService
    ) { }

    // 获取图片
    @Post('/getimgdata')
    async getImgData(
        @BodyParam('searchData') searchData: any
    ) {
        let path: string = '';
        let notAll: boolean = true;
        for (let i in searchData) {
            if (searchData[i] === 'all') {
                notAll = false;
                break;
            }
            path += `/${searchData[i]}`;
        }

        if (notAll) {
            const fileName = await this.fileService.getFile(`${PICTURES_PATH}${path}`);
            const pictures = fileName.reduce((arr, name, index) => {
                arr.push({
                    path: `data/pictures${path}`
                });
                return arr;
            }, [] as any);
            return pictures;
        } else {
            const dirName = await this.fileService.getDir(`${PICTURES_PATH}${path}`);
            let result: any = [];
            for (let i in dirName) {
                let fileName = await this.fileService.getFile(`${PICTURES_PATH}${path}/${dirName[i]}`);
                let pictures = fileName.reduce((arr, name, index) => {
                    arr.push({
                        path: `data/pictures${path}`
                    });
                    return arr;
                }, [] as any);
                result = [...result, ...pictures];
            }
            return result;
        }
    }

    // 获取数据
    @Post('/getdatadata')
    async getDataData(
        @BodyParam('searchData') searchData: any
    ) {
        const filterArr: any = Object.keys(searchData);
        const data: any = await getData(searchData);
        for (let i in data[0]) {
            if (filterArr.includes(i) || typeof data[0][i] === 'object') {
                delete data[0][i];
            }
        }
        return data;
    }


    @Get('/addDataCategory')
    async addDataCategory() {
        const condition = {
            type: 'rice',
            Year_item: '2013-drought',
            note: 'welcome to HZAU!',
            key_name: 'Trait',
            key_type: 'all,E,F1,F2,F3',
            category_name1: 'Accession_ID',
            category_name2: null,
            category_name3: null,
            category_name4: null,
            category_name5: null,
            category_name6: null,
            category_name7: null,
            category_name8: null,
            category_name9: null,
            category_name10: null,
        };
        const result = await this.categoryService.createDataCategory(condition);
        return result;
    }

}