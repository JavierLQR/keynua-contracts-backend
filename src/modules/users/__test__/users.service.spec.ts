import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '../users.service'
import { hashPassword } from '@app/common/hash_password/hash.password'
import { clearName } from '@app/helpers/clear-name'

// ✅ Mock de la función hashPassword
jest.mock('@app/common/hash_password/hash.password', () => ({
  hashPassword: jest.fn().mockResolvedValue('mockHashedPassword'),
}))

jest.mock('@app/helpers/clear-name', () => ({
  clearName: jest.fn().mockReturnValue('users name'),
}))

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should return created user message and hashed password', async () => {
      const dto = { name: 'Rodrigo', email: 'test@example.com' }
      const result = await service.create(dto)

      expect(result).toEqual({
        message: 'User created',
        createUserDto: dto,
        password: 'mockHashedPassword',
      })
      expect(hashPassword).toHaveBeenCalledWith('user')
    })
  })

  describe('findAll', () => {
    it('should return all users with hashed passwords', async () => {
      const result = await service.findAll()

      expect(result).toEqual({
        message: 'This action returns all users',
        cleanName: 'users name',
        passwords: ['mockHashedPassword', 'mockHashedPassword'],
      })

      // 🧠 Verifica que ambas funciones externas se usen correctamente
      expect(clearName).toHaveBeenCalledWith("user's name!@#")
      expect(hashPassword).toHaveBeenCalledTimes(3)
    })
  })

  describe('findOne', () => {
    it('should return message with user id', () => {
      const result = service.findOne(1)
      expect(result).toEqual({ message: 'This action returns a #1 user' })
    })
  })

  describe('update', () => {
    it('should return updated user message', () => {
      const dto = { name: 'Updated' }
      const result = service.update(1, dto)
      expect(result).toEqual({
        message: 'This action updates a #1 user',
        updateUserDto: dto,
      })
    })
  })

  describe('remove', () => {
    it('should return removed user message', () => {
      const result = service.remove(1)
      expect(result).toEqual({ message: 'This action removes a #1 user' })
    })
  })
})
