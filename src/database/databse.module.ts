import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './databse.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        let uri = '';
        switch (configService.get<string>('NODE_ENV')) {
          case 'production':
            uri = configService.get<string>('DB_CONNECTION_URI_PROD');
            break;
          case 'test':
            uri = configService.get<string>('DB_CONNECTION_URI_TEST');
            break;
          default:
            uri = configService.get<string>('DB_CONNECTION_URI_DEV');
            break;
        }
        return { uri };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
