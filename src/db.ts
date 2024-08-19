import { DataSource } from 'typeorm';
import { Todo } from './app/entities/todo.entity';
import { User } from './app/entities/user.entity';

export const createDataSource = () => {
  return new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'dhungana',
    database: 'todo',
    entities: [Todo, User] ,
    synchronize: true,
  });
};

const AppDataSource = createDataSource();

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

export { AppDataSource };
