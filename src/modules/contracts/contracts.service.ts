import { HttpService } from '@nestjs/axios'
import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { AxiosRequestConfig } from 'axios'

import { handleAxiosError } from '@app/common/utils/axios-error'
import { CreateContractDto } from './dto/create-contract.dto'
import { clearBase64 } from '@app/common/utils/clear-base64'
import { Contract } from './entities/contract.entity'

@Injectable()
export class ContractsService {
  private readonly api_key_keynua: string
  private readonly api_token_keynua: string
  private readonly base_url_keynua: string

  private readonly config: AxiosRequestConfig = {}
  private readonly logger: Logger = new Logger(ContractsService.name)

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.api_key_keynua = this.configService.getOrThrow<string>('API_KEY_KEYNUA')
    this.api_token_keynua = this.configService.getOrThrow<string>('API_TOKEN_KEYNUA')
    this.base_url_keynua = this.configService.getOrThrow<string>('BASE_URL_KEYNUA')

    this.config = {
      headers: {
        'x-api-key': this.api_key_keynua,
        authorization: this.api_token_keynua,
        'Content-Type': 'application/json',
      },
    }
  }

  /**
   *
   * @param id
   * @returns The response from the Keynua API after finding the contract
   * @see {@link https://docs.keynua.com/}
   * @description Finds a contract using the Keynua API
   */
  public async findOne(id: string) {
    try {
      const { data } = await this.httpService.axiosRef.get<Contract>(`${this.base_url_keynua}/${id}`, this.config)

      return {
        data,
        message: 'Contract found successfully',
        statusCode: HttpStatus.OK,
      }
    } catch (error) {
      handleAxiosError(error, this.logger, 'Keynua API', 'Error finding contract in Keynua')
    }
  }

  /**
   *
   * @param createContractDto Data Transfer Object containing contract creation details
   * @returns The response from the Keynua API after creating the contract
   * @see {@link https://docs.keynua.com/}
   * @description Creates a new contract using the Keynua API with the provided details
   */
  public async create(createContractDto: CreateContractDto) {
    try {
      const payload = this.buildPayload(createContractDto)
      const { data } = await this.httpService.axiosRef.put<Contract>(`${this.base_url_keynua}`, payload, this.config)

      return {
        data,
        message: 'Contract created successfully',
        statusCode: HttpStatus.CREATED,
      }
    } catch (error) {
      handleAxiosError(error, this.logger, 'Keynua API', 'Error creating contract in Keynua')
    }
  }

  /**
   *
   * @param createContractDto  Data Transfer Object containing contract creation details
   * @returns The payload to be sent to the Keynua API
   * @description Builds the payload to be sent to the Keynua API
   * @see {@link https://docs.keynua.com/}
   *
   */
  private buildPayload(createContractDto: CreateContractDto): Record<string, unknown> {
    const { chosenNotificationOptions } = createContractDto
    const payload = {
      ...createContractDto,
      documents: createContractDto.documents.map(({ name, base64 }) => ({
        name,
        base64: clearBase64(base64),
      })),
      flags: {
        chosenNotificationOptions,
      },
      users: createContractDto.users.map(({ name, email, groups, phone }) => ({
        name,
        email,
        phone: phone?.replace(/[^0-9]/g, ''),
        groups,
      })),
    }
    delete payload.chosenNotificationOptions

    return payload
  }
}
