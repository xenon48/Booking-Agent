import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CONSTRAINT_NAME } from 'src/common/constants';


@Entity()
@Unique(CONSTRAINT_NAME, ['seatId']) // unique для защиты от Race Condition
export class Reservation {
    @ApiProperty() // без DTO, так как это тестовое задание и одна маленькая сущность
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column({ name: 'seat_id' })
    seatId: number;

    @ApiProperty()
    @Column({ name: 'user_id' })
    userId: number;
}