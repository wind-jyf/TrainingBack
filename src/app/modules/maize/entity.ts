/*
 * @description: union_playable typeorm entity
 * @author: dujiawei
 * @Date: 2020-04-28 15:06:56
 */


import { Entity, PrimaryColumn } from 'typeorm';



@Entity({
  name: 'maize_gwas'
})
export class gwasEntity {
  @PrimaryColumn({
    name: 'GWASid',
    type: 'varchar',
    width: 50
  })
  public ['GWASid']!: string;
}

@Entity({
  name: 'maize_ril'
})
export class rilEntity {
  @PrimaryColumn({
    name: 'RILid',
    type: 'varchar',
    width: 50
  })
  public ['RILid']!: string;
}