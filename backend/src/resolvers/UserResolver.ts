import { Arg, Mutation, Resolver } from "type-graphql";
import * as argon2 from "argon2";
import { User } from "../entities/User";
import { UserInput } from "../inputs/UserInput";

@Resolver(User)
class UserResolver {
  @Mutation(() => String)
  async register(@Arg("data") newUserData: UserInput) {
    const result = await User.save({
      email: newUserData.email,
      hashedPassword: await argon2.hash(newUserData.password),
    });
    console.log("result", result);
    return "ok";
  }
}

export default UserResolver;
