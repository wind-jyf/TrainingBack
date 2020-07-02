import { Service } from 'typedi';
import { getRepository, FindManyOptions } from 'typeorm';
import { ArticleEntity } from './entity';

import { objectUtils } from '@/utils';

@Service()
export class ArticleService {
    private ArticleRepository = getRepository(ArticleEntity);

    async getArticleAndCount(conditions: FindManyOptions<ArticleEntity>, pagination?: { skip?: number; take?: number }) {
        return this.ArticleRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }
}