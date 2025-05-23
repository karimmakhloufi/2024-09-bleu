import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import * as argon2 from "argon2";

import jwt, { Secret } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";

import { User } from "../entities/User";
import { UserInput } from "../inputs/UserInput";
import { TempUser } from "../entities/TempUser";
import { ForgotPassword } from "../entities/ForgotPassword";

@ObjectType()
class UserInfo {
  @Field()
  isLoggedIn: boolean;

  @Field({ nullable: true })
  email?: String;
}

@Resolver(User)
class UserResolver {
  @Mutation(() => String)
  async register(@Arg("data") newUserData: UserInput) {
    const randomCode = uuidv4();
    const result = await TempUser.save({
      email: newUserData.email,
      hashedPassword: await argon2.hash(newUserData.password),
      randomCode: randomCode,
    });
    const resend = new Resend(process.env.RESEND_API_KEY);

    (async function () {
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [newUserData.email],
        subject: "Verify Email",
        html: `
          <p>Please click the link below to confirm your email address</p>
          <a href="http://localhost:7000/confirm/${randomCode}">
            http://localhost:7000/confirm/${randomCode}
          </a>
          `,
      });

      if (error) {
        return console.error({ error });
      }

      console.log({ data });
    })();
    console.log("result", result);
    return "The user was created";
  }

  @Mutation(() => String)
  async login(@Arg("data") loginUserData: UserInput, @Ctx() context: any) {
    let isPasswordCorrect = false;
    const user = await User.findOneBy({ email: loginUserData.email });
    if (user) {
      isPasswordCorrect = await argon2.verify(
        user.hashedPassword,
        loginUserData.password
      );
    }
    if (isPasswordCorrect === true && user !== null) {
      const token = jwt.sign(
        { email: user.email, userRole: user.role },
        process.env.JWT_SECRET_KEY as Secret
      );
      context.res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`);

      return "ok";
    } else {
      throw new Error("Incorrect login");
    }
  }

  @Mutation(() => String)
  async logout(@Ctx() context: any) {
    context.res.setHeader(
      "Set-Cookie",
      `token=; Secure; HttpOnly;expires=${new Date(Date.now()).toUTCString()}`
    );
    return "logged out";
  }

  @Query(() => UserInfo)
  async getUserInfo(@Ctx() context: any) {
    if (context.email) {
      return { isLoggedIn: true, email: context.email };
    } else {
      return { isLoggedIn: false };
    }
  }

  @Mutation(() => String)
  async confirmEmail(@Arg("codeByUser") codeByUser: string) {
    const tempUser = await TempUser.findOneByOrFail({ randomCode: codeByUser });
    await User.save({
      email: tempUser.email,
      hashedPassword: tempUser.hashedPassword,
    });
    tempUser.remove();
    return "ok";
  }

  @Mutation(() => String)
  async forgotPassword(@Arg("userEmail") userEmail: string) {
    const user = await User.findOneByOrFail({ email: userEmail });
    const randomCode = uuidv4();
    await ForgotPassword.save({ email: user.email, randomCode: randomCode });

    const resend = new Resend(process.env.RESEND_API_KEY);

    (async function () {
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [user.email],
        subject: "Change Password",
        html: `
          <p>Please click the link below to change your password</p>
          <a href="http://localhost:7000/changePassword/${randomCode}">
            http://localhost:7000/changePassword/${randomCode}
          </a>
          `,
      });

      if (error) {
        return console.error({ error });
      }

      console.log({ data });
    })();
    return "ok";
  }

  @Mutation(() => String)
  async changePassword(
    @Arg("code") code: string,
    @Arg("password") password: string
  ) {
    const forgotPasswordUser = await ForgotPassword.findOneByOrFail({
      randomCode: code,
    });
    const miliseconds =
      Date.now() - Date.parse(forgotPasswordUser.created_at.toUTCString());
    const minutes = miliseconds / 1000 / 60;
    console.log("minutes", minutes);
    if (minutes > 5) {
      forgotPasswordUser.remove();
      throw Error("The link has expired");
    }
    const user = await User.findOneByOrFail({
      email: forgotPasswordUser.email,
    });
    user.hashedPassword = await argon2.hash(password);
    user.save();
    forgotPasswordUser.remove();
    return "ok";
  }
}

export default UserResolver;
