import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Expense } from "./expense.entity";
import { CreateExpenseDto } from "./dto/create-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private repo: Repository<Expense>
  ) {}

  async findAll(): Promise<Expense[]> {
    return this.repo.find({
      order: { date: "DESC" },
    });
  }

  async create(data: CreateExpenseDto): Promise<Expense> {
    const expense: Expense = this.repo.create({
      ...data,
      date: new Date(data.date),
    });

    return await this.repo.save(expense);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException("Expense not found");
    }
  }
}
