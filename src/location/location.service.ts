import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class LocationService {
  accessToken: string;
  constructor(configService: ConfigService, private httpService: HttpService) {
    this.accessToken = configService.get<string>('MAPBOX_API_TOKEN');
  }

  geoCodeLocation(address: string): Observable<AxiosResponse<any>> {
    return this.httpService
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address,
        )}.json?access_token=${this.accessToken}`,
      )
      .pipe(map((res) => res.data));
  }
}
