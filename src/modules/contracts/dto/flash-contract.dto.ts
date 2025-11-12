import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString } from 'class-validator'

/**
 * DTO representing optional flags for a contract
 * Includes notification preferences and additional configuration options
 * @export
 * @class FlagsDto
 * @author Javier Rojas
 */
export class FlagsDto {
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
}
