import { Service } from 'typedi';
import { getRepository, FindConditions, FindManyOptions } from 'typeorm';
import { GroupEntity, GroupEnEntity } from './entity';

import { objectUtils } from '@/utils';

@Service()
export class GroupService {
    private GroupRepository = getRepository(GroupEntity);
    private GroupEnRepository = getRepository(GroupEnEntity);

    async getGroupAndCount(conditions: FindManyOptions<GroupEntity>, pagination?: { skip?: number; take?: number }) {
        return this.GroupRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async getGroupById(conditions: FindConditions<GroupEntity>) {
        return this.GroupRepository.find(objectUtils.clean({ ...conditions }))
    }

    async getGroupEnAndCount(conditions: FindManyOptions<GroupEntity>, pagination?: { skip?: number; take?: number }) {
        return this.GroupEnRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async getGroupEnById(conditions: FindConditions<GroupEntity>) {
        return this.GroupEnRepository.find(objectUtils.clean({ ...conditions }))
    }
}