import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './models/entities/reservation.entity';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({ // оставляю только App модуль, так как это тестовое задание с одной сущностью
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),

        autoLoadEntities: true,
        synchronize: true, // использую в формате для тестового задания
        // synchronize: false,

        extra: {
          max: 50 // для части задания про "на сайт придут 50 000 человек одновременно"
        }
      }),
    }),
    TypeOrmModule.forFeature([Reservation]),

    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1,
        limit: 10,
      },
      {
        name: 'long',
        ttl: 60,
        limit: 100,
      },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
