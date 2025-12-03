import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';
import { concat } from 'rxjs';

@Injectable()
export class Day3Solution implements DaySolution {
  readonly day = 3;
  readonly name = 'Day 3 placeholder';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day3.txt or via --input/--raw flags.';
    }

    let lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    let totalScore = 0;
    for (let line of lines) {
      let lineArr = line.split('');
      let lastArrEl = lineArr.pop()
      let firstDigit = Math.max(...lineArr.map(c => parseInt(c, 10)));
      let firstDigitIndex = lineArr.indexOf(firstDigit.toString());
      let arrAfterFirstDigit = lineArr.slice(firstDigitIndex + 1);
      arrAfterFirstDigit.push(lastArrEl!);
      let secondDigit = Math.max(...arrAfterFirstDigit.map(c => parseInt(c, 10)));
      console.log(`First digit: ${firstDigit}, Second digit: ${secondDigit}, Product: ${firstDigit * secondDigit}`);
      totalScore += parseInt(firstDigit.toString().concat(secondDigit.toString())); 
    }

    return `Total score: ${totalScore}`;
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day3.txt or via --input/--raw flags.';
    }

    return 'Part two not implemented yet.';
  }
}
