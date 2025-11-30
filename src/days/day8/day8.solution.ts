import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';

@Injectable()
export class Day8Solution implements DaySolution {
  readonly day = 8;
  readonly name = 'Day 8 placeholder';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day8.txt or via --input/--raw flags.';
    }

    return 'Part one not implemented yet.';
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day8.txt or via --input/--raw flags.';
    }

    return 'Part two not implemented yet.';
  }
}
