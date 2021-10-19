import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkService(): string {
    return 'service is online';
  }
}
