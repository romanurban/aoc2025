import { Inject, Injectable } from '@nestjs/common';
import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join } from 'node:path';

import { DayPart, DayResult, DaySolution } from './day-solution';
import { DAY_SOLUTIONS } from './days.tokens';

export interface RunOptions {
  day: number;
  part: DayPart;
  input?: string;
  rawInput?: string;
}

export interface RunResponse {
  day: number;
  name: string;
  partResults: { part: '1' | '2'; result: DayResult }[];
  inputSource: string;
}

@Injectable()
export class DayRunnerService {
  constructor(
    @Inject(DAY_SOLUTIONS) private readonly solutions: DaySolution[],
  ) {}

  listDays(): Pick<DaySolution, 'day' | 'name'>[] {
    return this.solutions
      .map(({ day, name }) => ({ day, name }))
      .sort((a, b) => a.day - b.day);
  }

  async run(options: RunOptions): Promise<RunResponse> {
    const { day, part } = options;
    const solution = this.solutions.find((entry) => entry.day === day);

    if (!solution) {
      throw new Error(`No implementation for day ${day}.`);
    }

    const input = await this.loadInput(day, options.input, options.rawInput);
    const partsToRun: ('1' | '2')[] = part === 'both' ? ['1', '2'] : [part];
    const partResults: { part: '1' | '2'; result: DayResult }[] = [];

    for (const currentPart of partsToRun) {
      const result =
        currentPart === '1'
          ? await solution.partOne(input)
          : await solution.partTwo(input);
      partResults.push({ part: currentPart, result });
    }

    return {
      day,
      name: solution.name,
      partResults,
      inputSource: this.describeInputSource(
        day,
        options.input,
        options.rawInput,
      ),
    };
  }

  private describeInputSource(
    day: number,
    explicit?: string,
    raw?: string,
  ): string {
    if (raw) {
      return 'inline input';
    }

    if (explicit) {
      return explicit;
    }

    return join('inputs', `day${day}.txt`);
  }

  private async loadInput(
    day: number,
    explicit?: string,
    raw?: string,
  ): Promise<string> {
    if (raw) {
      return raw;
    }

    const selectedPath =
      explicit ?? join(process.cwd(), 'inputs', `day${day}.txt`);
    try {
      await access(selectedPath, constants.R_OK);
      return await readFile(selectedPath, 'utf8');
    } catch (error) {
      if (explicit) {
        throw new Error(
          `Unable to read input from ${explicit}: ${(error as Error).message}`,
        );
      }

      return '';
    }
  }
}
