import { controller, IAppController } from '@foal/core';
import { TodoController } from './controllers/todo.controller';


export class AppController implements IAppController {
  subControllers = [
    controller('/todos', TodoController),
  ];
}
