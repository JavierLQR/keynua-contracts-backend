import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export const ConfigSwaggerApp = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Keynua Contracts API')
    .setDescription('API interna para crear contratos en Keynua')
    .setVersion('1.0')
    .addTag('contracts')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
}
