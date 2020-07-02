/*
 * @description: union_playable typeorm entity
 * @author: dujiawei
 * @Date: 2020-04-28 15:06:56
 */


import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'newslist'
})
export class NewsEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true
  })
  public id!: number;

  @Column({
    name: 'name',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public name!: string;

  @Column({
    name: 'date',
    type: 'date',
    nullable: true
  })
  public date!: string;

  @Column({
    name: 'content',
    type: 'longtext',
    nullable: true
  })
  public content!: string;

  @Column({
    name: 'clickrate',
    type: 'int',
    width: 11,
    nullable: true
  })
  public click_rate!: string;
}
