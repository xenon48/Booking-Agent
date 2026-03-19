import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { Reservation } from './models/entities/reservation.entity';
import { AppService } from './app.service';
import { CreateDto } from './models/dto/create.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserThrottlerGuard } from './common/user-throttler.guard';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Reservations')
@Controller('reserve')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: 'Create reservation' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Reservation })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Seat already reserved' })
  @ApiBody({ type: CreateDto })
  @Post()
  @UseGuards(UserThrottlerGuard)
  @Throttle({ short: {}, long: {} })
  async createReservation(@Body() body: CreateDto): Promise<Reservation> { // ответ без DTO, так как это тестовое задание и одна маленькая сущность
    try {
      return await this.appService.createReservation(body.seatId, body.userId);
    } catch (error) {
      throw error;
    }
  }
}
