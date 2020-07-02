import { Service } from 'typedi';
import { getRepository, FindConditions, FindManyOptions } from 'typeorm';
import { NewsEntity } from './entity';

import { objectUtils } from '@/utils';

@Service()
export class NewsService {
    private NewsRepository = getRepository(NewsEntity);

    async getNewsAndCount(conditions: FindManyOptions<NewsEntity>, pagination?: { skip?: number; take?: number }) {
        return this.NewsRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async getNewsById(conditions: FindConditions<NewsEntity>) {
        return this.NewsRepository.find(objectUtils.clean({ ...conditions }))
    }
}