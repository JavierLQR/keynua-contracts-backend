import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

/**
 * DTO representing a user (signer or participant) in a contract
 * Includes validation rules and Swagger documentation for each property
 * @export
 * @class UserDto
 * @author Javier Rojas
 */
export class UserDto {
  @ApiProperty({
    example: 'Javier Rojas',
    description: 'Full name of the user who will participate in the contract.',
  })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiPropertyOptional({
    example: 'javier.fullstack.qr@gmail.com',
    description: 'Email address of the user (optional).',
  })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiPropertyOptional({
    example: '+51987654321',
    description: 'Phone number of the user (optional).',
  })
  @IsOptional()
  @IsString()
  phone?: string

  @ApiProperty({
    example: ['signers'],
    description: 'List of groups the user belongs to. For the "keynua-peru-default" template, use ["signers"].',
  })
  @IsArray()
  @IsString({ each: true })
  groups!: string[]

  @ApiPropertyOptional({
    example: ['expiration-date'],
    description:
      'List of validations to skip in the signing flow. Allowed values: "expiration-date", "instructions-grade".',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  validationsToSkip?: string[]
}
