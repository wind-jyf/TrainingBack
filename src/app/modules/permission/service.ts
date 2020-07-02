import { Service } from 'typedi';
import { getRepository, FindConditions } from 'typeorm';
import { PermissionEntity } from './entity';

import { objectUtils } from '@/utils';

@Service()
export class PermissionEntityService {
    private PermissionEntityRepository = getRepository(PermissionEntity);

    async getPermission(conditions: FindConditions<PermissionEntity>) {
        return this.PermissionEntityRepository.find(objectUtils.clean({ ...conditions }))
    }

    async updatePermission(conditions: FindConditions<PermissionEntity>, values: Partial<PermissionEntity>) {
        return this.PermissionEntityRepository.update(objectUtils.clean(conditions), objectUtils.clean(values));
    }
}