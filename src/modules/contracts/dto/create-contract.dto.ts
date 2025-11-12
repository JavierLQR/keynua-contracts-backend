import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator'

import { DocumentDto } from './document-contract.dto'
import { FlagsDto } from './flash-contract.dto'
import { UserDto } from './user-contract.dto'

/**
 * DTO for creating a contract in Keynua
 * Contains validation and Swagger documentation for each property
 * Uses nested DTOs for documents, users, and flags
 * @export
 * @class CreateContractDto
 * @author Javier Rojas
 */

export class CreateContractDto {
  @ApiProperty({ example: 'Service Contract', description: 'Title of the contract' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string

  @ApiPropertyOptional({ example: 'Contract between client and supplier', description: 'Description of the contract' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string

  @ApiPropertyOptional({ example: 'REF-2025-01', description: 'Internal reference or contract identifier' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  reference?: string

  @ApiPropertyOptional({ example: 'es', enum: ['es', 'en'], default: 'es', description: 'Language of the contract' })
  @IsOptional()
  @IsString()
  language?: 'es' | 'en' = 'es'

  @ApiPropertyOptional({
    example: ['email'],
    enum: ['sms', 'whatsapp', 'email'],
    description:
      'List of notification types. Valid values are "sms", "whatsapp", or "email". You cannot use "sms" and "whatsapp" simultaneously.',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  chosenNotificationOptions?: ('sms' | 'whatsapp' | 'email')[]

  @ApiProperty({
    example: '2025-11-15T18:00:00.000Z',
    description: 'Exact expiration date and time in UTC (ISO 8601 format)',
  })
  @IsISO8601(
    {},
    {
      message: 'expirationDatetime must be in ISO 8601 format',
    },
  )
  @IsOptional()
  expirationDatetime?: string

  @ApiPropertyOptional({ example: 24, minimum: 1, description: 'Expiration time of the contract in hours (minimum 1)' })
  @IsOptional()
  @IsInt()
  @Min(1)
  expirationInHours?: number

  @ApiProperty({
    example: 'keynua-peru-default',
    description: 'ID of the template or signing flow to use',
  })
  @IsString()
  @IsNotEmpty()
  templateId!: string

  @ApiPropertyOptional({
    example: 'acc_123abc',
    description: 'Account ID of a child account used to create contracts on behalf of other accounts (optional)',
  })
  @IsOptional()
  @IsString()
  onBehalfOf?: string

  @ApiProperty({
    type: [DocumentDto],
    description:
      'Array of PDF documents in base64 or using storageId. Minimum 1 and maximum 10. Total weight ≤ 4.5 MB.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  documents!: DocumentDto[]

  @ApiProperty({
    type: [UserDto],
    description: 'Array of users (signers). Each user belongs to a group, usually "signers".',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  users!: UserDto[]

  @ApiPropertyOptional({
    example: { internalId: 'ABC123', project: 'CRM-Dental' },
    description: 'Custom metadata to associate the Keynua contract with your internal system',
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>

  @ApiPropertyOptional({
    type: () => FlagsDto,
    description: 'Additional configuration such as notification types or Cavali integration',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => FlagsDto)
  flags?: FlagsDto

  @ApiPropertyOptional({
    example: { showLogo: true },
    description: 'Dynamic configuration of the template if you want to override the templateId',
  })
  @IsOptional()
  @IsObject()
  templateOptions?: Record<string, unknown>
}
