/*
 * @description: union_playable typeorm entity
 * @author: dujiawei
 * @Date: 2020-04-28 15:06:56
 */


import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'project'
})
export class ProjectEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true
  })
  public id!: number;

  @Column({
    name: 'projectname',
    type: 'text',
    width: 255,
    nullable: true
  })
  public projectname!: string;
}
