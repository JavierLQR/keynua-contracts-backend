import { Body, Controller, HttpCode, Post, HttpStatus, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ContractsService } from './contracts.service'
import { CreateContractDto } from './dto/create-contract.dto'

@Controller({
  path: 'contracts',
})
@ApiTags('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.create(createContractDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOne(id)
  }
}
