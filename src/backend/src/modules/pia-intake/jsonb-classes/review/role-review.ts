import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';

export class RoleReview {
  @IsBoolean()
  @IsOptional()
  isAcknowledged?: boolean;

  @IsString()
  @IsOptional()
  reviewNote?: string;

  @IsString()
  @IsOptional()
  reviewedByDisplayName?: string;

  @IsString()
  @IsOptional()
  reviewedByUsername?: string;

  @IsString()
  @IsOptional()
  reviewedByGuid?: string;

  @IsDateString()
  @IsOptional()
  reviewedAt?: Date;

  @IsDateString()
  @IsOptional()
  reviewLastUpdatedAt?: Date;
}
