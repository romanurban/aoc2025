import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';

@Injectable()
export class Day12Solution implements DaySolution {
  readonly day = 12;
  readonly name = 'Day 12 placeholder';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day12.txt or via --input/--raw flags.';
    }

    return 'Part one not implemented yet.';
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day12.txt or via --input/--raw flags.';
    }

    return 'Part two not implemented yet.';
  }
}
