import { Module } from '@nestjs/common'
import { WeatherController } from './weather.controller'
import { WeatherService } from './weather.service'
import { ConfigService } from '@nestjs/config'
import { AuthModule } from '../auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Action } from './action.entity'

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Action])],
  controllers: [WeatherController],
  providers: [WeatherService, ConfigService]
})
export class WeatherModule {}
