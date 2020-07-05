import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
    name: 'data_categroy'
})
export class CottonDataEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int',
        unsigned: true
    })
    public id!: number;

    @Column({
        name: 'type',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public type!: string;

    @Column({
        name: 'Year_item',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public Year_item!: string;

    @Column({
        name: 'note',
        type: 'text',
        nullable: true
    })
    public note!: string;

    @Column({
        name: 'key_name',
        type: 'varchar',
        width: 255,
        nullable: true
    })
    public key_name!: string;

    @Column({
        name: 'key_type',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public key_type!: string;

    @Column({
        name: 'category_name1',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name1!: string;

    @Column({
        name: 'category_name2',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name2!: string;

    @Column({
        name: 'category_name3',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name3!: string;

    @Column({
        name: 'category_name4',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name4!: string;

    @Column({
        name: 'category_name5',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name5!: string;

    @Column({
        name: 'category_name6',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name6!: string;

    @Column({
        name: 'category_name7',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name7!: string;

    @Column({
        name: 'category_name8',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name8!: string;

    @Column({
        name: 'category_name9',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name9!: string;

    @Column({
        name: 'category_name10',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name10!: string;
}

@Entity({
    name: 'image_categroy'
})
export class CottonImgEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int',
        unsigned: true
    })
    public id!: number;

    @Column({
        name: 'type',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public type!: string;

    @Column({
        name: 'Year_item',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public Year_item!: string;

    @Column({
        name: 'note',
        type: 'text',
        nullable: true
    })
    public note!: string;

    @Column({
        name: 'key_name',
        type: 'varchar',
        width: 255,
        nullable: true
    })
    public key_name!: string;

    @Column({
        name: 'key_type',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public key_type!: string;

    @Column({
        name: 'category_name1',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name1!: string;

    @Column({
        name: 'category_name2',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name2!: string;

    @Column({
        name: 'category_name3',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name3!: string;

    @Column({
        name: 'category_name4',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name4!: string;

    @Column({
        name: 'category_name5',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name5!: string;

    @Column({
        name: 'category_name6',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name6!: string;

    @Column({
        name: 'category_name7',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name7!: string;

    @Column({
        name: 'category_name8',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name8!: string;

    @Column({
        name: 'category_name9',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name9!: string;

    @Column({
        name: 'category_name10',
        type: 'varchar',
        width: 255,
        nullable: false
    })
    public category_name10!: string;
}