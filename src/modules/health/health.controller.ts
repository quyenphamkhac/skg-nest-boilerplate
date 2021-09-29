import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { HttpHealthCheck } from './types/http-heath';

@Controller('')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  check(): HttpHealthCheck {
    return this.healthService.getServerTimeStamp();
  }
}
