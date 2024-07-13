import { Todo } from '../app/entities/todo.entity';
import { AppDataSource } from '../db';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Define the schema for the expected arguments
export const schema = {
  properties: {
    text: { type: 'string' }
  },
  required: ['text'],
  type: 'object',
};

// Main function to execute the script
export async function main(args: { text: string }) {
  // Connect to the database
  await AppDataSource.initialize();

  try {
    // Create a new task with the text given in the command line
    const todo = new Todo();
    todo.text = args.text;

    // Save the task in the database and then display it in the console
    console.log(await todo.save());
  } catch (error: any) {
    console.log(error.message);
  } finally {
    // Close the connection to the database
    await AppDataSource.destroy();
  }
}

// Parse command line arguments and execute the main function
yargs(hideBin(process.argv))
  .command(
    'create',
    'Create a new todo',
    {
      text: {
        description: 'The text of the todo',
        type: 'string',
        demandOption: true,
      },
    },
    (argv) => main({ text: argv.text as string })
  )
  .help()
  .argv;
