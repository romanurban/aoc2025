import { Provider } from '@nestjs/common';

import { DaySolution } from './day-solution';
import { DAY_SOLUTIONS } from './days.tokens';
import { Day1Solution } from './day1/day1.solution';
import { Day2Solution } from './day2/day2.solution';
import { Day3Solution } from './day3/day3.solution';
import { Day4Solution } from './day4/day4.solution';
import { Day5Solution } from './day5/day5.solution';
import { Day6Solution } from './day6/day6.solution';
import { Day7Solution } from './day7/day7.solution';
import { Day8Solution } from './day8/day8.solution';
import { Day9Solution } from './day9/day9.solution';
import { Day10Solution } from './day10/day10.solution';
import { Day11Solution } from './day11/day11.solution';
import { Day12Solution } from './day12/day12.solution';

export const daySolutionClasses = [
  Day1Solution,
  Day2Solution,
  Day3Solution,
  Day4Solution,
  Day5Solution,
  Day6Solution,
  Day7Solution,
  Day8Solution,
  Day9Solution,
  Day10Solution,
  Day11Solution,
  Day12Solution,
];

export const daySolutionProviders: Provider[] = [
  ...daySolutionClasses,
  {
    provide: DAY_SOLUTIONS,
    useFactory: (...solutions: DaySolution[]): DaySolution[] => solutions,
    inject: [...daySolutionClasses],
  },
];
