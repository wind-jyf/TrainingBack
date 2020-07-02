import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'instuments'
})
export class InstrumentEntity {
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
    name: 'content',
    type: 'text',
    nullable: true
  })
  public content!: string;
}

@Entity({
  name: 'instuments_e'
})
export class InstrumentEnEntity {
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
    name: 'content',
    type: 'text',
    nullable: true
  })
  public content!: string;
}
