import {
  controller,
  dependency,
  IAppController,
  Store,
  UseSessions,
} from "@foal/core";
import { TodoController } from "./controllers/todo.controller";
import { User } from "./entities";
import { ApiController } from "./controllers/api.controller";
import { AuthController } from "./controllers/auth.controller";
import { getRepository } from "typeorm";

@UseSessions({
  cookie: true,
  user: (id: number) => getRepository(User).findOne({ where: { id } }),
})
export class AppController implements IAppController {
  @dependency
  store: Store;

  subControllers = [
    controller("/todos", TodoController),
    controller("/auth", AuthController),
    controller("/api", ApiController),
  ];
}
