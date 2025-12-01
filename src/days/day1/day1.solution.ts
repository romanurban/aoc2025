import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';

@Injectable()
export class Day1Solution implements DaySolution {
  readonly day = 1;
  readonly name = 'Day 1 placeholder';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day1.txt or via --input/--raw flags.';
    }

    let position = 50;
    let dialRange = 100;
    let clickCount = 0;
    let lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    for (let line of lines) {
      let sign = line[0];
      let move = parseInt(line.substring(1), 10);
      if (sign === 'R') {
        for (let i = 0; i < move; i++) {
          position += 1;
          if (position >= dialRange) {
            position = 0;
          }
        } 
      } else {
        for (let i = 0; i < move; i++) {
          position -= 1;
          if (position < 0) {
            position = dialRange - 1;
          }
        } 
      }

      if (position == 0) {
        clickCount += 1;
      }
    }

    return `Total clicks: ${clickCount}`;
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day1.txt or via --input/--raw flags.';
    }

    let position = 50;
    let dialRange = 100;
    let clickCount = 0;
    let lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    for (let line of lines) {
      let sign = line[0];
      let move = parseInt(line.substring(1), 10);
      if (sign === 'R') {
        for (let i = 0; i < move; i++) {
          position += 1;
          if (position >= dialRange) {
            position = 0;
          }
          if (position === 0) {
            clickCount += 1;
          }
        } 
      } else {
        for (let i = 0; i < move; i++) {
          position -= 1;
          if (position < 0) {
            position = dialRange - 1;
          }
          if (position === 0) {
            clickCount += 1;
          }
        } 
      }
    }

    return `Total clicks: ${clickCount}`;
  }
}
