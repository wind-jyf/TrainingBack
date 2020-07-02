import { Service } from 'typedi';
import { getRepository, FindConditions, FindManyOptions } from 'typeorm';
import { InstrumentEntity, InstrumentEnEntity } from './entity';

import { objectUtils } from '@/utils';

@Service()
export class InstrumentService {
    private InstrumentRepository = getRepository(InstrumentEntity);
    private InstrumentEnRepository = getRepository(InstrumentEnEntity);

    async getInstrumentAndCount(conditions: FindManyOptions<InstrumentEntity>, pagination?: { skip?: number; take?: number }) {
        return this.InstrumentRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async getInstrumentById(conditions: FindConditions<InstrumentEntity>) {
        return this.InstrumentRepository.find(objectUtils.clean({ ...conditions }))
    }

    async getInstrumentEnAndCount(conditions: FindManyOptions<InstrumentEnEntity>, pagination?: { skip?: number; take?: number }) {
        return this.InstrumentEnRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async getInstrumentEnById(conditions: FindConditions<InstrumentEnEntity>) {
        return this.InstrumentEnRepository.find(objectUtils.clean({ ...conditions }))
    }
}