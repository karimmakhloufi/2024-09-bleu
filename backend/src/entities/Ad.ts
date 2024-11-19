import { MinLength } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Picture } from "./Picture";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  @MinLength(10)
  description: string;

  @Field()
  @Column()
  owner: string;

  @Field()
  @Column()
  price: number;

  @Field(() => [Picture], { nullable: true })
  @OneToMany(() => Picture, (picture) => picture.ad, {
    cascade: true,
    eager: true,
  })
  pictures: Picture[];

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  createdAt: Date;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  category: Category;

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true })
  @JoinTable()
  tags: Tag[];
}
