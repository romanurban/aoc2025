import { Injectable, Logger } from '@nestjs/common';

import { DayPart } from './days/day-solution';
import { DayRunnerService, RunResponse } from './days/day-runner.service';

export interface CliRunOptions {
  day?: number;
  part?: DayPart;
  input?: string;
  rawInput?: string;
  list?: boolean;
}

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly dayRunner: DayRunnerService) {}

  async execute(options: CliRunOptions): Promise<void> {
    if (options.list) {
      this.printAvailableDays();
      return;
    }

    if (!options.day) {
      throw new Error(
        'Provide a day via --day <number> or use --list to see available solutions.',
      );
    }

    const part: DayPart = options.part ?? 'both';
    const result = await this.dayRunner.run({
      day: options.day,
      part,
      input: options.input,
      rawInput: options.rawInput,
    });

    this.printRunResult(result);
  }

  private printAvailableDays(): void {
    const entries = this.dayRunner.listDays();
    if (!entries.length) {
      this.logger.warn(
        'No days registered yet. Implement a solution under src/days/dayX.',
      );
      return;
    }

    this.logger.log('Available days:');
    entries.forEach(({ day, name }) => {
      this.logger.log(`  Day ${day}: ${name}`);
    });
  }

  private printRunResult(result: RunResponse): void {
    this.logger.log(`Day ${result.day}: ${result.name}`);
    this.logger.log(`Input source: ${result.inputSource}`);

    result.partResults.forEach(({ part, result: value }) => {
      this.logger.log(`Part ${part} result -> ${value ?? '[no output]'}`);
    });
  }
}
