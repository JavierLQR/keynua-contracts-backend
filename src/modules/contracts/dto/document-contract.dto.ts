import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

/**
 * DTO representing a document inside a Keynua contract
 * Used to define PDF files to be signed (by base64 or storageId)
 * @export
 * @class DocumentDto
 * @author Javier Rojas
 */
export class DocumentDto {
  @ApiProperty({
    example: 'contract.pdf',
    description: 'Name of the PDF document that will be signed',
  })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiPropertyOptional({
    example: 'JVBERi0xLjQKJcfs...',
    description: 'Document content encoded in Base64 (without the prefix "data:application/pdf;base64,").',
  })
  @IsOptional()
  @IsString()
  base64?: string

  @ApiPropertyOptional({
    example: 'stor_abc123',
    description: 'Storage ID of the document previously uploaded to Keynua (alternative to using base64).',
  })
  @IsOptional()
  @IsString()
  storageId?: string
}
