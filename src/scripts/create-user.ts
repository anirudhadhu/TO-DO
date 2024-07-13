// App
import { User } from '../app/entities';
import { AppDataSource } from '../db';

export const schema = {
  additionalProperties: false,
  properties: {

  },
  required: [

  ],
  type: 'object',
};

export async function main() {
  await AppDataSource.initialize();

  try {
    const user = new User();

    console.log(await user.save());
  } catch (error: any) {
    console.error(error.message);
  } finally {
    await AppDataSource.destroy();
  }
}
