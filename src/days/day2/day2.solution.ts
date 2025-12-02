import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';

@Injectable()
export class Day2Solution implements DaySolution {
  readonly day = 2;
  readonly name = 'Day 2 placeholder';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day2.txt or via --input/--raw flags.';
    }

    let matchSum = 0;
    let lines = input.split(',').map(line => line.trim()).filter(line => line.length > 0);

    for (let line of lines) {
      let rangeStart = line.split('-')[0];
      let rangeEnd = line.split('-')[1];

      for (let i = parseInt(rangeStart, 10); i <= parseInt(rangeEnd, 10); i++) {
        let currNum = i.toString();
        if (this.isEven(currNum.length)) {
          if (currNum.slice(0, currNum.length / 2) === currNum.slice(currNum.length / 2)) { // left and right halves of number match
            console.log(`Matching number found: ${i}`);
            matchSum += i;
          }
        }
      }
    }

    return `Sum of all matching numbers: ${matchSum}`;
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day2.txt or via --input/--raw flags.';
    }


    let matchSum = 0;
    let lines = input.split(',').map(line => line.trim()).filter(line => line.length > 0);

    for (let line of lines) {
      let rangeStart = line.split('-')[0];
      let rangeEnd = line.split('-')[1];

      for (let i = parseInt(rangeStart, 10); i <= parseInt(rangeEnd, 10); i++) {
        let currNum = i.toString();
        const n = currNum.length;
        for ( let j = 1; j <= Math.floor(n / 2); j++ ) {
          const supposedPattern = currNum.slice(0, j);
          const repeatedPattern = supposedPattern.repeat(n / j);
          if ( repeatedPattern === currNum ) {
            console.log(`Matching number found: ${j}`);
            matchSum += i;
            break;
          }
        }

      }
    }

    return `Sum of all matching numbers: ${matchSum}`;
  }

  isEven(n) {
    return n % 2 == 0;
    }
}
