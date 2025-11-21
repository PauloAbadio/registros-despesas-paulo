
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private repo: Repository<Expense>,
  ) {}

  async findAll(): Promise<Expense[]> {
    return this.repo.find({ order: { date: 'DESC' } });
  }

  async create(data: CreateExpenseDto): Promise<Expense> {
    const e = this.repo.create({
      ...data,
      date: new Date(data.date)
    } as any);
    return this.repo.save(e);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Expense not found');
    }
  }
}
