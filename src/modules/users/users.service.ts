import { Injectable } from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { hashPassword } from '@app/common/hash_password/hash.password'
import { clearName } from '@app/helpers/clear-name'

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const password = await hashPassword('user')
    return {
      message: 'User created',
      createUserDto,
      password,
    }
  }

  async findAll() {
    const cleanName = clearName("user's name!@#")
    return {
      message: 'This action returns all users',
      cleanName,
      passwords: await Promise.all(['user1', 'user2'].map(async () => await hashPassword('user'))),
    }
  }

  findOne(id: number) {
    return {
      message: `This action returns a #${id} user`,
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return {
      message: `This action updates a #${id} user`,
      updateUserDto,
    }
  }

  remove(id: number) {
    return {
      message: `This action removes a #${id} user`,
    }
  }
}
