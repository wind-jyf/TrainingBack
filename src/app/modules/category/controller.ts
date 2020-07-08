import {
  Get,
  QueryParam,
  Controller,
  UseBefore
} from 'routing-controllers';
import { FormatResponse } from '@/app/middlewares/formatResponse';
import { CategoryService, getCategoryData, getDirData } from './service';

const categoryNameList = ['category_name1', 'category_name2', 'category_name3', 'category_name4', 'category_name5', 'category_name6', 'category_name7', 'category_name8', 'category_name9', 'category_name10',];

function getValue(obj: any, key: string) {
  return obj[key];
}

const PICTURES_PATH = '..\\Crophe\\data\\pictures-new';

@Controller('/api/crophe')
@UseBefore(FormatResponse)
export class CategoryController {

  constructor(
    private categoryService: CategoryService
  ) { }

  @Get('/DataCategory')
  async getDataNote(
    @QueryParam('type') type: string,
    @QueryParam('Year_item') Year_item: string
  ) {
    //获取有效分类名，用categotyList :string[]存储
    let [categoryData] = await this.categoryService.getDataCategory({ type, Year_item })
    let categoryList: string[] = categoryNameList.filter((item: string) => {
      return getValue(categoryData, item) !== null;
    })
      .map((item: string) => {
        return getValue(categoryData, item);
      })

    //data_rice_2013_drought
    let table = 'data_' + type + '_' + Year_item.replace('-', '_');
    let result: object[] = [];
    function formatter(obj: object[], name: string) {
      return obj.map(item => {
        return getValue(item, name);
      })
    }
    for (let i: number = 0; i < categoryList.length; i++) {
      let res: any = await getCategoryData(table, categoryList[i]);
      result.push({
        title: categoryList[i],
        array: formatter(res, categoryList[i])
      });
    }
    result.push({
      title: categoryData.key_name,
      array: categoryData.key_type.split(',')
    })
    return result;
  }

  @Get('/ImgCategory')
  async getImgCategory(
    @QueryParam('type') type: string,
    @QueryParam('Year_item') Year_item: string
  ) {
    //获取有效分类名，用categotyList :string[]存储
    let [categoryData] = await this.categoryService.getImgCategory({ type, Year_item })
    let categoryList: string[] = categoryNameList.filter((item: string) => {
      return getValue(categoryData, item) !== null;
    })
      .map((item: string) => {
        return getValue(categoryData, item);
      });

    let resultSet = await getDirData(PICTURES_PATH + '\\' + type + '\\' + Year_item);
    let result: object[] = [];
    for (let i: number = 0; i < categoryList.length; i++) {
      // if (i == categoryList.length - 1) {
      //   resultSet[i].unshift('all')
      //   result.push({
      //     title: categoryList[i],
      //     array: resultSet[i]
      //   });
      // } else {
      //   result.push({
      //     title: categoryList[i],
      //     array: resultSet[i]
      //   });
      // }
      result.push({
        title: categoryList[i],
        array: resultSet[i]
      });
    }
    result.push({
      title:categoryData.key_name,
      array:categoryData.key_type.split(',')
    })
    return result;
  }
}