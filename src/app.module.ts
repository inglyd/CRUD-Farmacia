import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Root@1234', 
      database: 'db_farmacia',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
