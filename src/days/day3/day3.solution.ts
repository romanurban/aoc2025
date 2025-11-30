import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';

@Injectable()
export class Day3Solution implements DaySolution {
  readonly day = 3;
  readonly name = 'Day 3 placeholder';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day3.txt or via --input/--raw flags.';
    }

    return 'Part one not implemented yet.';
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day3.txt or via --input/--raw flags.';
    }

    return 'Part two not implemented yet.';
  }
}
