import { Controller, Get, Query } from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { WeatherService } from './weather.service'
import { type WeatherResponse } from './weather.response'

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor (
    private readonly weatherService: WeatherService
  ) {}

  @Get()
  @ApiQuery({ required: true, name: 'city', type: String })
  @ApiQuery({ required: true, name: 'apiToken', type: String })
  @ApiQuery({ required: false, name: 'language', type: String })
  async getWeather (
    @Query('city') city: string,
      @Query('apiToken') apiToken: string,
      @Query('language') language?: string
  ): Promise<WeatherResponse> {
    return await this.weatherService.getWeather(city, apiToken, language ?? 'ru')
  }
}
