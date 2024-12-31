import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { Todo } from '../entity/todo.entity';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    findAll(): Promise<Todo[]> {
        return this.todoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Todo> {
        return this.todoService.findOne(id);
    }

    @Post()
    create(@Body() todo: Todo): Promise<Todo> {
        return this.todoService.create(todo);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() todo: Todo): Promise<Todo> {
        return this.todoService.update(id, todo);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.todoService.delete(id);
    }
}
