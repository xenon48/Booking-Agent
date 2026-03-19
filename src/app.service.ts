import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './models/entities/reservation.entity';
import { CONSTRAINT_NAME } from './common/constants';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Reservation) private readonly repo: Repository<Reservation>
  ) { }

  async createReservation(seatId: number, userId: number): Promise<Reservation> {
    try {
      const newReservation = this.repo.create({ seatId, userId });
      return await this.repo.save(newReservation); // без транзакций, так как Insert уже атомарная операция
    } catch (error: any) {
      if (error.constraint === CONSTRAINT_NAME) {
        throw new HttpException('Seat already reserved', HttpStatus.CONFLICT);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}