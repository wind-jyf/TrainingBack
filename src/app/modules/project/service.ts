import { Service } from 'typedi';
import { getRepository, FindManyOptions } from 'typeorm';
import { ProjectEntity } from './entity';

import { objectUtils } from '@/utils';

@Service()
export class ProjectEntityService {
    private ProjectEntityRepository = getRepository(ProjectEntity);

    async getProjectEntityAndCount(conditions: FindManyOptions<ProjectEntity>, pagination?: { skip?: number; take?: number }) {
        return this.ProjectEntityRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }
}