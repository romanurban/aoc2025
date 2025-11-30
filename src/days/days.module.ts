import { Module } from '@nestjs/common';

import { DayRunnerService } from './day-runner.service';
import { daySolutionProviders } from './days.providers';

@Module({
  providers: [...daySolutionProviders, DayRunnerService],
  exports: [DayRunnerService],
})
export class DaysModule {}
