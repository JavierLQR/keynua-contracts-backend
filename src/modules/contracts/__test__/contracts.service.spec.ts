/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { handleAxiosError } from '@app/common/utils/axios-error'
import { HttpService } from '@nestjs/axios'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { AxiosError } from 'axios'
import { CreateContractDto } from '../dto/create-contract.dto'
import { Contract } from '../entities/contract.entity'
import { ContractsService } from '../contracts.service'

jest.mock('@app/common/utils/axios-error')

describe('ContractsService', () => {
  let service: ContractsService
  let httpService: HttpService
  let configService: ConfigService

  const mockConfigService = {
    getOrThrow: jest.fn((key: string) => {
      const config = {
        API_KEY_KEYNUA: 'mock-api-key',
        API_TOKEN_KEYNUA: 'mock-api-token',
        BASE_URL_KEYNUA: 'https://mock.keynua.com/api/contracts',
      }
      return config[key]
    }),
  }

  const mockHttpService = {
    axiosRef: {
      put: jest.fn(),
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContractsService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile()

    service = module.get<ContractsService>(ContractsService)
    httpService = module.get<HttpService>(HttpService)
    configService = module.get<ConfigService>(ConfigService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('buildPayload', () => {
    it('should clean base64 and phone, and return formatted payload', () => {
      const dto: CreateContractDto = {
        title: 'Test Contract',
        reference: 'ABC123',
        chosenNotificationOptions: ['email+whatsapp'],
        documents: [{ name: 'file.pdf', base64: 'data:application/pdf;base64,ABCDEF123' }],
        users: [
          {
            name: 'Javier',
            email: 'javier@example.com',
            phone: '+51 931 022 090',
            groups: ['signers'],
          },
        ],
      }

      const payload = service.buildPayload(dto)

      expect(payload.flags).toEqual({
        chosenNotificationOptions: ['email+whatsapp'],
      })
      expect(payload.documents[0].base64).toBe('ABCDEF123')
      expect(payload.users[0].phone).toBe('51931022090')
      expect(payload.chosenNotificationOptions).toBeUndefined()
    })
  })

  describe('create', () => {
    it('should call axios PUT and return data when successful', async () => {
      const mockContract: Contract = {
        id: 'mock-id',
        accountId: 'mock-account',
        sentBy: 'mock-sender',
        templateId: 'mock-template',
        createdAt: new Date().toISOString(),
        startedAt: new Date().toISOString(),
        finishedAt: null,
        deletedAt: null,
        canceledAt: null,
        title: 'Test',
        description: 'Mock desc',
        language: 'es',
        timezone: 'America/Lima',
        metadata: {},
        reference: 'ABC',
        shortCode: '12345',
        expirationInHours: 24,
        expired: false,
        itemsCount: 1,
        groups: [],
        users: [],
        documents: [],
        items: [],
        status: 'pending_input',
      }

      const dto: CreateContractDto = {
        title: 'Contract Test',
        reference: 'Ref001',
        chosenNotificationOptions: ['email'],
        documents: [{ name: 'contract.pdf', base64: 'data:application/pdf;base64,XYZ123' }],
        users: [{ name: 'Rodrigo', email: 'rodrigo@example.com', phone: '51999999999', groups: ['signers'] }],
        templateId: 'templateId',
      }

      mockHttpService.axiosRef.put.mockResolvedValueOnce({ data: mockContract })

      const result = await service.create(dto)

      expect(mockHttpService.axiosRef.put).toHaveBeenCalledTimes(1)
      expect(result).toEqual({
        data: mockContract,
        message: 'Contract created successfully',
        statusCode: 201,
      })
    })

    it('should handle axios error with handleAxiosError', async () => {
      const dto: CreateContractDto = {
        documents: [{ name: 'contract.pdf', base64: 'data:application/pdf;base64,XYZ123' }],
        templateId: 'templateId',
        title: 'Contract Test',
        users: [{ name: 'Rodrigo', email: 'rodrigo@example.com', phone: '51999999999', groups: ['signers'] }],
      }

      const mockError = new AxiosError('Request failed')
      mockHttpService.axiosRef.put.mockRejectedValueOnce(mockError)

      await service.create(dto)

      expect(handleAxiosError).toHaveBeenCalledWith(
        mockError,
        expect.any(Logger),
        'Keynua API',
        'Error creating contract in Keynua',
      )
    })
  })
})
