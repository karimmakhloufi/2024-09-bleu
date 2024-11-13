import { Ad } from "../entities/Ad";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver(Ad)
class AdResolver {
  @Query(() => [Ad])
  async getAllAds() {
    const ads = await Ad.find({
      order: {
        id: "DESC",
      },
    });
    return ads;
  }

  @Query(() => Ad)
  async getAdById(@Arg("id") id: number) {
    const ad = await Ad.findOneByOrFail({ id: id });
    return ad;
  }

  @Mutation(() => Ad)
  async createNewAd(
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("owner") owner: string,
    @Arg("price") price: number,
    @Arg("location") location: string,
    @Arg("createdAt") createdAt: Date
  ) {
    const adToSave = new Ad();
    adToSave.createdAt = createdAt;
    adToSave.description = description;
    adToSave.location = location;
    adToSave.owner = owner;
    adToSave.price = price;
    adToSave.title = title;

    const result = await adToSave.save();
    return result;
  }
}

export default AdResolver;
