/*
 * @description: union_playable typeorm entity
 * @author: dujiawei
 * @Date: 2020-04-28 15:06:56
 */


import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'articles'
})
export class ArticleEntity {
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
    name: 'path',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public path!: string;

  @Column({
    name: 'date',
    type: 'date',
    nullable: true
  })
  public date!: string;

  @Column({
    name: 'language',
    type: 'enum',
    nullable: false
  })
  public language!: string;
}
