import 'reflect-metadata';
import { Config, createApp, displayServerURL } from '@foal/core';
import { AppController } from './app/app.controller';
import { AppDataSource } from './db';

async function main() {
  await AppDataSource.initialize();

  const app = createApp(AppController);

  const port = Config.get('port', 'number', 3000);

  const server = (await app).listen(port, () => {
    displayServerURL(port);
  });

  return server;
}

main().catch(err => console.error(err));
