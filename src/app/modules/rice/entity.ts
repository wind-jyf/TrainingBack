/*
 * @description: union_playable typeorm entity
 * @author: dujiawei
 * @Date: 2020-04-28 15:06:56
 */


import { Entity, PrimaryColumn , Column, EntitySchema } from 'typeorm';

@Entity({
  name: 'information_schema.COLUMNS'
})
export class TableColumnEntity {


  @PrimaryColumn({
    name: 'COLUMN_NAME',
    type: 'varchar',
    width: 64,
    nullable: false
  })
  public COLUMN_NAME!: string;

  @Column({
    name: 'TABLE_NAME',
    type: 'varchar',
    width: 64,
    nullable: false
  })
  public TABLE_NAME!: string;
}

@Entity({
  name: 'phenotypic data 2013'
})
export class drought2013Schema {
  @PrimaryColumn({
    name: 'Phenotype ID',
    type: 'int',
    width: 4
  })
  public ['Phenotype ID']!: string;

  @Column({
    name: 'Corresponding genotype ID',
    type: 'varchar',
    width: 20
  })
  public ['Corresponding genotype ID']!: string;
}

@Entity({
  name: 'phenotypic data_2016'
})
export class drought2016Schema {
  @PrimaryColumn({
    name: 'Accession_2013ID',
    type: 'int',
    width: 10
  })
  public ['Accession_2013ID']!: string;
}

@Entity({
  name: 'data_wue'
})
export class wueSchema {
  @PrimaryColumn({
    name: 'dyear',
    type: 'varchar',
    width: 255
  })
  public ['dyear']!: string;

  @PrimaryColumn({
    name: 'num_id',
    type: 'varchar',
    width: 255
  })
  public ['num_id']!: string;

  @PrimaryColumn({
    name: 'Growth_stage',
    type: 'int',
    width: 255
  })
  public ['Growth_stage']!: string;
}

@Entity({
  name: 'data_tiller'
})
export class tillerSchema {
  @PrimaryColumn({
    name: 'year',
    type: 'varchar',
    width: 255
  })
  public ['year']!: string;

  @PrimaryColumn({
    name: 'number',
    type: 'varchar',
    width: 255
  })
  public ['number']!: string;
}