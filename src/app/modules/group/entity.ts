import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'teachers'
})
export class GroupEntity {
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
    name: 'img',
    type: 'text',
    nullable: true
  })
  public img!: string;

  @Column({
    name: 'descripe',
    type: 'text',
    nullable: true
  })
  public descripe!: string;
}

@Entity({
  name: 'teacher_e'
})
export class GroupEnEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true
  })
  public id!: number;

  @Column({
    name: 'left',
    type: 'text',
    width: 255,
    nullable: true
  })
  public left!: string;

  @Column({
    name: 'img',
    type: 'varchar',
    nullable: true
  })
  public img!: string;

  @Column({
    name: 'foot',
    type: 'text',
    nullable: true
  })
  public foot!: string;

  @Column({
    name: 'content',
    type: 'text',
    nullable: true
  })
  public content!: string;
}
