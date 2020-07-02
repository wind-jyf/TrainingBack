import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'user'
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true
  })
  public id!: number;

  @PrimaryColumn({
    name: 'username',
    type: 'varchar',
    width: 255,
    nullable: false
  })
  public username!: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false
  })
  public password!: string;

  @Column({
    name: 'userrole',
    type: 'enum',
    nullable: true
  })
  public userrole!: string;

  @Column({
    name: 'name',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public name!: string;

  @Column({
    name: 'sex',
    type: 'enum',
    nullable: true
  })
  public sex!: string;

  @Column({
    name: 'college',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public college!: string;

  @Column({
    name: 'lab',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public lab!: string;

  @Column({
    name: 'lableader',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public lableader!: string;

  @Column({
    name: 'email',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public email!: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public phone!: string;

  @Column({
    name: 'address',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public address!: string;

  @Column({
    name: 'title',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public title!: string;

  @Column({
    name: 'author',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public author!: string;

  @Column({
    name: 'organization',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public organization!: string;

  @Column({
    name: 'key',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public key!: string;

  @Column({
    name: 'abstracter',
    type: 'text',
    nullable: true
  })
  public abstracter!: string;

  @Column({
    name: 'report',
    type: 'enum',
    nullable: true
  })
  public report!: string;

  @Column({
    name: 'hotel',
    type: 'enum',
    nullable: true
  })
  public hotel!: string;

  @Column({
    name: 'publish',
    type: 'enum',
    nullable: true
  })
  public publish!: string;

  @Column({
    name: 'journalname',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public journalname!: string;

  @Column({
    name: 'filename',
    type: 'varchar',
    width: 255,
    nullable: true
  })
  public filename!: string;
}
