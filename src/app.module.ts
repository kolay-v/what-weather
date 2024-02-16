import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { WeatherModule } from './weather/weather.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as path from 'path'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    WeatherModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [path.resolve(__dirname, '/**/*.entity.{ts,js}')],
        synchronize: true
      }),
      inject: [ConfigService]
    })
  ]
})
export class AppModule {}
