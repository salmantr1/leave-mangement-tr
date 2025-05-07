/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/leave/dto/create-multiple-leaves.dto.ts
import {
  IsMongoId,
  ValidateNested,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class SingleLeaveEntry {
  @Type(() => Date)
  date: Date;

  reason: string;
}

export class CreateMultipleLeavesDto {
  @IsMongoId()
  employee: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SingleLeaveEntry)
  leaves: SingleLeaveEntry[];
}
