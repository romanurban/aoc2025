import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';

@Injectable()
export class Day9Solution implements DaySolution {
  readonly day = 9;
  readonly name = 'Day 9 placeholder';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day9.txt or via --input/--raw flags.';
    }

    return 'Part one not implemented yet.';
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day9.txt or via --input/--raw flags.';
    }

    return 'Part two not implemented yet.';
  }
}
