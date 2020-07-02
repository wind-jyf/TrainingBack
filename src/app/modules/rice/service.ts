import fs from 'fs';
import { Service } from 'typedi';
import { getRepository, FindConditions, FindManyOptions, getConnection } from 'typeorm';
import { TableColumnEntity, drought2013Schema, drought2016Schema, wueSchema, tillerSchema } from './entity';

import { objectUtils } from '@/utils';


@Service()
export class TableColumnService {
    private TableColumnEntityRepository = getRepository(TableColumnEntity);

    async getColumn(conditions: FindManyOptions<TableColumnEntity>) {
        return this.TableColumnEntityRepository.find(objectUtils.clean({ ...conditions }))
    }
}

@Service()
export class riceDataService {
  private drought2013EntityRepository = getRepository(drought2013Schema);
  private drought2016EntityRepository = getRepository(drought2016Schema);
  private tillerEntityRepository = getRepository(tillerSchema);

  async getDrought2013Id(conditions: FindManyOptions) {
      return this.drought2013EntityRepository.find(objectUtils.clean({ ...conditions }));
  }

  async getDrought2013Data(conditions: any) {
    const { id, trait, aliasName } = conditions;
    return getConnection().createQueryBuilder().select(trait === '*' ? `*` : trait).where(`${aliasName}.Phenotype ID = :id`, {id}).from(drought2013Schema, aliasName).getRawMany();
  }

  async getDrought2016Id(conditions: FindManyOptions) {
    return this.drought2016EntityRepository.find(objectUtils.clean({ ...conditions }));
  }

  async getDrought2016Data(conditions: any) {
    const { id, trait, aliasName } = conditions;
    return getConnection().createQueryBuilder().select(trait === '*' ? `*` : trait).where(`${aliasName}.Accession_2013ID = :id`, {id}).from(drought2016Schema, aliasName).getRawMany();
  }

  async getWueId(options: any) {
    const { aliasName, distinctName, year } = options;
    return getConnection().createQueryBuilder().select(`DISTINCT ${aliasName}.${distinctName}`, distinctName).where(`${aliasName}.dyear = :year`, {year}).from(wueSchema, aliasName).getRawMany();
  }

  async getWueData(conditions: any) {
    const { aliasName, id, year, trait, growStage } = conditions;
    if(growStage === 0) {
      return getConnection().createQueryBuilder()
      .select(trait === '*' ? `*` : trait)
      .where(`${aliasName}.num_id = :id`, {id})
      .andWhere(`${aliasName}.dyear = :year`, {year})
      .from(wueSchema, aliasName).getRawMany();
    } else {
      return getConnection().createQueryBuilder()
      .select(trait === '*' ? `*` : trait)
      .where(`${aliasName}.num_id = :id`, {id})
      .andWhere(`${aliasName}.dyear = :year`, {year})
      .andWhere(`${aliasName}.Growth_stage = :growStage`, {growStage})
      .from(wueSchema, aliasName).getRawMany();
    }
  }

  async getTillerId(conditions: FindManyOptions) {
    return this.tillerEntityRepository.find(objectUtils.clean({ ...conditions }));
  }

  async getTillerData(conditions: any) {
    const { id, trait, aliasName } = conditions;
    return getConnection().createQueryBuilder().select(trait === '*' ? `*` : `\`${trait}\``).where(`${aliasName}.number = :id`, {id}).from(tillerSchema, aliasName).getRawMany();
  }

}

@Service()
export class FileService {
    async getDir(path: string) {
        const dir = await fs.promises.opendir(path);
        const dirName = [];
        
        for await (const dirent of dir) {
          if(dirent.isDirectory()) {
           dirName.push(dirent.name)
          }
        }
        return dirName;
    }

    async getFile(path: string) {
        const dir = await fs.promises.opendir(path);
        const fileName = [];
        
        for await (const dirent of dir) {
          if(dirent.isFile()) {
            fileName.push(dirent.name)
          }
        }
        return fileName;
    }
}