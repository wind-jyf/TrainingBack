import {
    Get,
    Post,
    QueryParam,
    BodyParam,
    Controller,
    UseBefore,
    UploadedFile
} from 'routing-controllers';
import { FormatResponse } from '@/app/middlewares/formatResponse';

import { CategoryService, FileService } from './service';
import { getData } from './service';
import { paginationUtils } from '@/utils';

const PICTURES_PATH = '../Crophe/data/pictures-new';

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
                    path: `data/pictures${path}`,
                    name: name
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
                        path: `data/pictures${path}`,
                        name: name
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

    /**
     * 管理员对数据、图片目录表的增删改查
     */

    @Post('/getCategory')
    async getCategory(
        @BodyParam('condition') condition: object
    ) {
        //const condition = { type: 'rice' };
        const dataCategory = await this.categoryService.getDataCategory(condition);
        const imgCategory = await this.categoryService.getImageCategory(condition);
        const result = {
            data: dataCategory,
            image: imgCategory
        }
        return result;
    }


    @Post('/addDataCategory')
    async addDataCategory(
        @BodyParam('condition') condition: any
    ) {
        /*  两个添加的示例数据
                 const condition = {
                    id: '',
                    type: 'rice',
                    Year_item: '2013-drought',
                    ...
                }; */
        if (!condition.id) delete condition.id;
        const result = await this.categoryService.createDataCategory(condition);
        return result;
    }

    @Post('/addImgCategory')
    async addImgCategory(
        @BodyParam('condition') condition: any
    ) {
        if (!condition.id) delete condition.id;
        const result = await this.categoryService.createImageCategory(condition);
        return result;
    }

    @Post('/deleteDataCategory')
    async deleteDataCategory(
        @BodyParam('condition') condition: object
    ) {
        // 删除的示例参数
        // const condition = { id: 2 }
        const result = await this.categoryService.deleteDataCategory(condition);
        return result;
    }

    @Post('/deleteImgCategory')
    async deleteImgCategory(
        @BodyParam('condition') condition: object
    ) {
        const result = await this.categoryService.deleteImageCategory(condition);
        return result;
    }

    @Post('/updateDataCategory')
    async updateDataCategory(
        @BodyParam('condition') condition: any
    ) {
        const { id } = condition;
        const idObj = { id };
        delete condition.id;
        const result = await this.categoryService.updateDataCategory(idObj, condition);
        return result;
    }

    @Post('/updateImgCategory')
    async updateImgCategory(
        @BodyParam('condition') condition: any
    ) {
        const { id } = condition;
        const idObj = { id };
        delete condition.id;
        const result = await this.categoryService.updateImageCategory(idObj, condition);
        return result;
    }

    /**
     * 下载、上传、删除文件
     */

    @Get('/getdownloadlist')
    async getFileList(
        @QueryParam('page_size') pageSize?: number,
        @QueryParam('page') page?: number
    ) {
        const [fileList, total] = await this.fileService.getFileList({
            select: ['id', 'name', 'path', 'date'],
            order: { id: 'DESC' }
        },
            paginationUtils.getCondition(page, pageSize)
        );
        return {
            fileList,
            pagination: paginationUtils.getResponse(total, page, pageSize)
        }
    }

    @Post('/uploadfile')
    async uploadFile(
        @BodyParam('name') name: string,
        @BodyParam('date') date: string,
        @UploadedFile('file') file: any
    ) {
        const result = await this.fileService.uploadFile({ name, date, file });
        return result;
    }

    @Get('/deletefile')
    async deleteFile(
        @QueryParam('id') id: number,
        @QueryParam('path') path: string
    ) {
        const result = await this.fileService.deleteFile({ id, path });
        return result;
    }
}


