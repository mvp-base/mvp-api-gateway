import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GatewayModule,
    OpenaiModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
