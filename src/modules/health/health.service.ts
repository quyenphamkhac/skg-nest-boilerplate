import { Injectable } from '@nestjs/common';
import { HttpHealthCheck } from './types/http-heath';

@Injectable()
export class HealthService {
  getServerTimeStamp(): HttpHealthCheck {
    return {
      timestamp: new Date().toISOString(),
    };
  }
}
