import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  getLocation(@Query('address') address: string): any {
    if (!address || !address?.trim()) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: `invalid address parameter`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.locationService.geoCodeLocation(address);
  }
}
