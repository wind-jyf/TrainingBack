import { Service } from 'typedi';
import { getRepository, FindConditions } from 'typeorm';
import { UserEntity } from './entity';

import { objectUtils } from '@/utils';

@Service()
export class userService {
    private UserRepository = getRepository(UserEntity);

    async getUser(conditions: FindConditions<UserEntity>) {
        return this.UserRepository.find(objectUtils.clean({ ...conditions }))
    }
}