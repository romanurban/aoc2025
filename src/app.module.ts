import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { DaysModule } from './days/days.module';

@Module({
  imports: [DaysModule],
  providers: [AppService],
})
export class AppModule {}
