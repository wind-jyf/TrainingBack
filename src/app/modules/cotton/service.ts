import { Service } from 'typedi';
import { getRepository, FindConditions, FindManyOptions } from 'typeorm';
import { CottonDataEntity,CottonImgEntity } from './entity';
import { objectUtils } from '@/utils';

@Service()
export class CottonService {
    private CottonDataRepository = getRepository(CottonDataEntity);
    private CottonImgRepository = getRepository(CottonImgEntity);

    async getGroupById(conditions: FindConditions<CottonDataEntity>) {
        return this.CottonDataRepository.find(objectUtils.clean({ ...conditions }))
    }

    async getGroupEnById(conditions: FindConditions<CottonImgEntity>) {
        return this.CottonImgRepository.find(objectUtils.clean({ ...conditions }))
    }
}