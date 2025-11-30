import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';

@Injectable()
export class Day10Solution implements DaySolution {
  readonly day = 10;
  readonly name = 'Day 10 placeholder';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day10.txt or via --input/--raw flags.';
    }

    return 'Part one not implemented yet.';
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day10.txt or via --input/--raw flags.';
    }

    return 'Part two not implemented yet.';
  }
}
