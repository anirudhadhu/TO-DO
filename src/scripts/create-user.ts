import { hashPassword } from '@foal/core';
import { User } from '../app/entities';
import { AppDataSource } from '../db';

export const schema = {
  additionalProperties: false,
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
  type: 'object',
};

export async function main(args) {
  await AppDataSource.initialize();

  try {
    const userRepository = AppDataSource.getRepository(User); // Get the repository

    const user = new User();
    user.email = args.email;
    user.password = await hashPassword(args.password);

    // Save the user via the repository
    console.log(await userRepository.save(user));
  } catch (error: any) {
    console.error(error.message);
  } finally {
    await AppDataSource.destroy();
  }
}
