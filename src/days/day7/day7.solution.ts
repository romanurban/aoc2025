import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';

@Injectable()
export class Day7Solution implements DaySolution {
  readonly day = 7;
  readonly name = 'Day 7 placeholder';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day7.txt or via --input/--raw flags.';
    }

    let lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    let grid: string[][] = lines.map(line => line.split('').map(ch => ch));
    let timesSplit = 0;

    for ( let i = 0; i < grid[0].length; i++ ) {
      if (grid[0][i] === 'S') {
        // found start
        console.log(`Found start at (0, ${i})`);
        // draw beam downwards from start
        grid[1][i] = '|';
      }
    }

    
    for (let i = 1; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === '|') {
          // beam down
          if (i + 1 < grid.length && grid[i + 1][j] === '.') {
            grid[i + 1][j] = '|';
          } else if (i + 1 < grid.length && grid[i + 1][j] === '^') {
            // beam splits down-left and down-right
            if (j - 1 >= 0 && grid[i + 1][j - 1] === '.') {
              grid[i + 1][j - 1] = '|';
            }
            if (j + 1 < grid[i].length && grid[i + 1][j + 1] === '.') {
              grid[i + 1][j + 1] = '|';
            }
            timesSplit++;
          }
        }
      }
    }

    return `Beam split ${timesSplit} times.`;
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day7.txt or via --input/--raw flags.';
    }

    const lines = input
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    type Cell = { ch: string; count: number };

    // Build a grid where each cell holds both the character and a timeline count
    const grid: Cell[][] = lines.map(line =>
      line.split('').map(ch => ({ ch, count: 0 })),
    );

    const height = grid.length;
    const width = grid[0].length;

    for (let j = 0; j < width; j++) {
      if (grid[0][j].ch === 'S') {
        if (height > 1) {
          grid[1][j].count += 1;
        }
      }
    }

    for (let i = 1; i < height - 1; i++) {
      for (let j = 0; j < width; j++) {
        const current = grid[i][j];
        const c = current.count;
        if (c === 0) {
          continue;
        }

        const below = grid[i + 1][j];

        if (below.ch === '^') {
          if (j - 1 >= 0) {
            grid[i + 1][j - 1].count += c;
          }
          if (j + 1 < width) {
            grid[i + 1][j + 1].count += c;
          }
        } else {
          grid[i + 1][j].count += c;
        }
      }
    }

    // All timelines now end on the last row
    const lastRow = height - 1;
    let totalTimelines = 0;
    for (let j = 0; j < width; j++) {
      totalTimelines += grid[lastRow][j].count;
    }

    return `Particle ends up on ${totalTimelines} different timelines.`;
  }

}
