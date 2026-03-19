import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, Min } from 'class-validator';


export class CreateDto {
  @ApiProperty({ example: 1, name: 'seat_id' })
  @Expose({ name: 'seat_id' })
  @IsInt()
  @Min(1)
  seatId: number;

  @ApiProperty({ example: 10, name: 'user_id' })
  @Expose({ name: 'user_id' })
  @IsInt()
  @Min(1)
  userId: number;
}
