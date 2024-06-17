import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { ConfigModule } from '@nestjs/config';
// import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: Joi.object({
      //   RABBIT_MQ_URI: Joi.string().required(),
      //   RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
      // }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'main_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order, OrderItem]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
