import { Picture } from "../entities/Picture";
import { Category } from "../entities/Category";
import { Field, ID, InputType } from "type-graphql";

@InputType()
class PictureInput {
  @Field()
  url: string;
}

@InputType()
class AdInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  owner: string;

  @Field()
  price: number;

  @Field()
  location: string;

  @Field()
  createdAt: Date;

  @Field(() => ID)
  category: Category;

  @Field(() => [PictureInput], { nullable: true })
  picturesUrls?: Picture[];

  @Field(() => [String], { nullable: true })
  tags: string[];
}

export default AdInput;
