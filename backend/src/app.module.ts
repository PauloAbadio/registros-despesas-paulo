
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseModule } from './expense/expense.module';
import { Expense } from './expense/expense.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 1433),
      username: process.env.DB_USERNAME || 'sa',
      password: process.env.DB_PASSWORD || 'YourStrong!Passw0rd',
      database: process.env.DB_DATABASE || 'expensesdb',
      entities: [Expense],
      synchronize: true,
      options: {
        enableArithAbort: true
      }
    }),
    ExpenseModule
  ],
})
export class AppModule {}
