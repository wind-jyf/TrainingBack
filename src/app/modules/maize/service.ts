import { Service } from 'typedi';
import { getRepository, FindConditions, FindManyOptions, getConnection } from 'typeorm';
import { rilEntity, gwasEntity } from './entity';

import { objectUtils } from '@/utils';


@Service()
export class maizeDataService {
  private rilEntityRepository = getRepository(rilEntity);
  private gwasEntityRepository = getRepository(gwasEntity);

  async getRilrDataId(conditions: FindManyOptions) {
    return this.rilEntityRepository.find(objectUtils.clean({ ...conditions }));
  }

  async getRilrData(conditions: any) {
    const { id, trait, aliasName } = conditions;
    
    return getConnection().createQueryBuilder().select(trait === '*' ? `*` : trait).where(`${aliasName}.RILid = :id`, {id}).from(rilEntity, aliasName).getRawMany();
  }

  async getGwasDataId(conditions: FindManyOptions) {
    return this.gwasEntityRepository.find(objectUtils.clean({ ...conditions }));
  }

  async getGwasData(conditions: any) {
    const { id, trait, aliasName } = conditions;
    return getConnection().createQueryBuilder().select(trait === '*' ? `*` : trait).where(`${aliasName}.GWASid = :id`, {id}).from(gwasEntity, aliasName).getRawMany();
  }
}