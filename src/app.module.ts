import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'

import { ContractsModule } from './modules/contracts/contracts.module'

@Module({
  imports: [
    HttpModule.register({
      global: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ContractsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
