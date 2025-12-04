import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';

@Injectable()
export class Day4Solution implements DaySolution {
  readonly day = 4;
  readonly name = 'Day 4 placeholder';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day4.txt or via --input/--raw flags.';
    }

    let accessibleCount = 0;
    let map: string[][] = [];
    let lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    for (let line of lines) {
      let rowItems = line.split('');
      console.log(`Row items: ${rowItems}`);
      map.push(rowItems);
    }

    let dimensionX = map[0].length;
    let dimensionY = map.length;
    console.log(`Map dimensions: ${dimensionX} x ${dimensionY}`);

    for (let y = 0; y < dimensionY; y++) {
      for (let x = 0; x < dimensionX; x++) {
        let currentItem = map[y][x];
        // console.log(`Current item at (${x}, ${y}): ${currentItem}`);
        if (currentItem === '@') {
          console.log(`Found @ at (${x}, ${y})`);
          let adjacentAtCount = 0;
          let directions = [
            [-1, 0], [1, 0], // left, right
            [0, -1], [0, 1], // up, down
            [-1, -1], [1, -1], // top-left, top-right
            [-1, 1], [1, 1] // bottom-left, bottom-right
          ];
          for (let dir of directions) {
            let newX = x + dir[0];
            let newY = y + dir[1];
            if (newX >= 0 && newX < dimensionX && newY >= 0 && newY < dimensionY) {
              if (map[newY][newX] === '@') {
                adjacentAtCount++;
              }
            }
          }
          console.log(`Adjacent @ count: ${adjacentAtCount}`);
          if (adjacentAtCount < 4) {
            console.log(`Is accessible`);
            accessibleCount++;
          }
        }
      }
    }

    return `Total accessible @ count: ${accessibleCount}`;
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day4.txt or via --input/--raw flags.';
    }

    let map: string[][] = [];
    let lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    for (let line of lines) {
      let rowItems = line.split('');
      console.log(`Row items: ${rowItems}`);
      map.push(rowItems);
    }

    let dimensionX = map[0].length;
    let dimensionY = map.length;
    console.log(`Map dimensions: ${dimensionX} x ${dimensionY}`);

    let globalAccessibleCount = 0;
    let accessibleCount = 1; // start with 1 to enter the loop
    while (accessibleCount > 0) {
      // reset on each cycle
      globalAccessibleCount += accessibleCount;
      accessibleCount = 0;

      for (let y = 0; y < dimensionY; y++) {
        for (let x = 0; x < dimensionX; x++) {
          let currentItem = map[y][x];
          // console.log(`Current item at (${x}, ${y}): ${currentItem}`);
          if (currentItem === '@') {
            console.log(`Found @ at (${x}, ${y})`);
            let adjacentAtCount = 0;
            let directions = [
              [-1, 0], [1, 0], // left, right
              [0, -1], [0, 1], // up, down
              [-1, -1], [1, -1], // top-left, top-right
              [-1, 1], [1, 1] // bottom-left, bottom-right
            ];
            for (let dir of directions) {
              let newX = x + dir[0];
              let newY = y + dir[1];
              if (newX >= 0 && newX < dimensionX && newY >= 0 && newY < dimensionY) {
                if (map[newY][newX] === '@') {
                  adjacentAtCount++;
                }
              }
            }
            console.log(`Adjacent @ count: ${adjacentAtCount}`);
            if (adjacentAtCount < 4) {
              console.log(`Is accessible`);
              map[y][x] = '.';
              accessibleCount++;
            }
          }
        }
      }
    }

    return `Total accessible @ count: ${globalAccessibleCount-1}`; // subtract 1 that we used to enter the loop
  }
}