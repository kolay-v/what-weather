import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { type WeatherResponse } from './weather.response'
import { AuthService } from '../auth/auth.service'
import { Action } from './action.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class WeatherService {
  constructor (
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    @InjectRepository(Action)
    private readonly usersRepository: Repository<Action>
  ) {}

  async getWeather (city: string, apiToken: string, language: string): Promise<WeatherResponse> {
    const user = await this.authService.validateToken(apiToken)
    if (user == null) {
      throw new UnauthorizedException('invalid token.')
    }
    const action = new Action()
    action.user = user

    const key = this.configService.get<string>('WEATHER_KEY')
    if (key == null) {
      throw new Error('please specify api key.')
    }
    const url = new URL('https://api.weatherapi.com/v1/current.json')
    url.searchParams.append('q', city)
    url.searchParams.append('lang', language)
    url.searchParams.append('key', key)
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      action.resultStatus = response.status
      if (!response.ok) {
        return { status: response.status }
      }

      const data = await response.json()
      const tempC = data.current?.temp_c
      action.tempC = tempC
      return {
        status: response.status,
        tempC
      }
    } catch (e) {
      return { status: 500 }
    } finally {
      await this.usersRepository.save(action)
    }
  }
}
