/*
 * @description: union_playable typeorm entity
 * @author: dujiawei
 * @Date: 2020-04-28 15:06:56
 */


import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'search_year'
})
export class PermissionEntity {
  @PrimaryGeneratedColumn({
    name: 's_id',
    type: 'int',
    unsigned: true
  })
  public s_id!: number;

  @Column({
    name: 's_tp',
    type: 'varchar',
    width: 255,
    nullable: false
  })
  public s_tp!: string;

  @Column({
    name: 's_year',
    type: 'varchar',
    width: 255,
    nullable: false
  })
  public s_year!: string;

  @Column({
    name: 's_authorize',
    type: 'enum',
    nullable: false
  })
  public s_authorize!: string;

  @Column({
    name: 's_img_data',
    type: 'enum',
    nullable: false
  })
  public s_img_data!: string;

  @Column({
    name: 's_user',
    type: 'varchar',
    width: 255,
    nullable: false
  })
  public s_user!: string;
}
