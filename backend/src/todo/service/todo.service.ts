import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Todo } from '../entity/todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ) {}
    
    async findAll(): Promise<Todo[]> {
        return this.todoRepository.find();
    }
    
    async findOne(id: number): Promise<Todo> {
        return this.todoRepository.findOne({where: {id}});
    }

    async create(todo: Todo): Promise<Todo> {
        return this.todoRepository.save(todo);
    }
    
    async update(id: number, todo: Todo): Promise<Todo> {
        await this.todoRepository.update(id, todo);
        return this.findOne(id);
    }
    
    async delete(id: number): Promise<void> {
        await this.todoRepository.delete(id);
    }
}
