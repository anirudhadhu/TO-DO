import {
  Context,
  hashPassword,
  HttpResponseOK,
  HttpResponseUnauthorized,
  Post,
  ValidateBody,
  verifyPassword,
} from "@foal/core";
import { getSecretOrPrivateKey } from "@foal/jwt";
import { sign } from "jsonwebtoken";
import { promisify } from "util";
import { getRepository } from "typeorm"; // Importing getRepository from TypeORM
import { User } from "../entities";

const credentialsSchema = {
  additionalProperties: false,
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  type: "object",
};

export class AuthController {
  @Post("/signup")
  @ValidateBody(credentialsSchema)
  async signup(ctx: Context) {
    const userRepository = getRepository(User);

    const user = new User();
    user.email = ctx.request.body.email;
    user.password = await hashPassword(ctx.request.body.password);

    await userRepository.save(user);

    return new HttpResponseOK({
      token: await this.createJWT(user),
    });
  }

  @Post("/login")
  @ValidateBody(credentialsSchema)
  async login(ctx: Context) {
    const userRepository = getRepository(User);

    const user = await userRepository.findOneBy({
      email: ctx.request.body.email,
    });

    if (!user) {
      return new HttpResponseUnauthorized();
    }

    if (!(await verifyPassword(ctx.request.body.password, user.password))) {
      return new HttpResponseUnauthorized();
    }

    return new HttpResponseOK({
      token: await this.createJWT(user),
    });
  }

  private async createJWT(user: User): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
    };

    return promisify(sign as any)(payload, getSecretOrPrivateKey(), {
      subject: user.id.toString(),
    });
  }
}
