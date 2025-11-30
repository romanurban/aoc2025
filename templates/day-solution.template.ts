import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../src/days/day-solution';

/**
 * Copy this file into src/days/dayXX/, rename it (e.g., day13.solution.ts),
 * update the class name, and fix the import above to '../day-solution'.
 * Finally, register the class inside src/days/days.providers.ts.
 */
@Injectable()
export class DayXXSolution implements DaySolution {
  readonly day = 99; // Replace with the target day number
  readonly name = 'Descriptive puzzle name';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/dayXX.txt or via --input/--raw flags.';
    }

    // Add part one logic here
    return 'Part one not implemented yet.';
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/dayXX.txt or via --input/--raw flags.';
    }

    // Add part two logic here
    return 'Part two not implemented yet.';
  }
}
