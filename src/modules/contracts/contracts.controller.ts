import { Body, Controller, HttpCode, Post, HttpStatus, Get, Param } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

import { ContractsService } from './contracts.service'
import { CreateContractDto } from './dto/create-contract.dto'

@Controller({
  path: 'contracts',
})
@ApiTags('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un contrato en Keynua' })
  @ApiBody({ type: CreateContractDto })
  @ApiResponse({ status: 201, description: 'Contrato creado correctamente' })
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.create(createContractDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener información de un contrato' })
  @ApiParam({ name: 'id', description: 'ID del contrato' })
  @ApiResponse({ status: 200, description: 'Detalle del contrato retornado' })
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.contractsService.findOne(id)
  }
}
