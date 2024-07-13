import { Context, dependency, Get, Post, Put, Delete, HttpResponseOK, HttpResponseCreated, HttpResponseNotFound } from '@foal/core';
import { AppDataSource } from '../../db';
import { Todo } from '../entities/todo.entity';

export class TodoController {

  @Post('/')
  async create(ctx: Context) {
    const todo = new Todo();
    todo.text = ctx.request.body.text;
    await todo.save();
    return new HttpResponseCreated(todo);
  }

  @Get('/')
  async getAll() {
    const todos = await Todo.find();
    return new HttpResponseOK(todos);
  }

  @Get('/:id')
  async getOne(ctx: Context) {
    const todo = await Todo.findOneBy({ id: ctx.request.params.id });
    if (!todo) {
      return new HttpResponseNotFound();
    }
    return new HttpResponseOK(todo);
  }

  @Put('/:id')
  async update(ctx: Context) {
    const todo = await Todo.findOneBy({ id: ctx.request.params.id });
    if (!todo) {
      return new HttpResponseNotFound();
    }
    todo.text = ctx.request.body.text;
    todo.completed = ctx.request.body.completed;
    await todo.save();
    return new HttpResponseOK(todo);
  }

  @Delete('/:id')
  async delete(ctx: Context) {
    const todo = await Todo.findOneBy({ id: ctx.request.params.id });
    if (!todo) {
      return new HttpResponseNotFound();
    }
    await todo.remove();
    return new HttpResponseOK(todo);
  }
}
