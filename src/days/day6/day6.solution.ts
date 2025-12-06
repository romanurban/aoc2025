import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';

@Injectable()
export class Day6Solution implements DaySolution {
  readonly day = 6;
  readonly name = 'Day 6 placeholder';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day6.txt or via --input/--raw flags.';
    }

    const lines = input
      .trim()
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0);

    const opLine = lines[lines.length - 1];
    const numberLines = lines.slice(0, -1);

    const rows = numberLines.map(line =>
      line.split(/\s+/).map(Number)
    );

    const operations = opLine.split(/\s+/);
    console.log('Operations:', operations);
    console.log('Rows:', rows);

    const numCols = rows[0].length;

    const columns = Array.from({ length: numCols }, (_, colIndex) =>
      rows.map(row => row[colIndex])
    );

    console.log('Columns:', columns);

    // apply operations on columns
    const results = columns.map((col, idx) => {
      const op = operations[idx];
      if (op === '+') {
        return col.reduce((sum, x) => sum + x, 0);
      } else if (op === '*') {
        return col.reduce((prod, x) => prod * x, 1);
      } else {
        throw new Error(`Unknown op ${op} in column ${idx}`);
      }
    });

    const total = results.reduce((sum, value) => sum + value, 0);


    return `Total after operations: ${total}`;
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day6.txt or via --input/--raw flags.';
    }

      const allLines = input
        .split('\n')
        .filter(l => l.trim().length > 0);

      const opLine = allLines[allLines.length - 1];
      const numberLines = allLines.slice(0, -1);

      const width = Math.max(...numberLines.map(l => l.length));
      const problems = numberLines.map(l => l.padEnd(width, ' '));

      const operations: string[] = [];
      for (const ch of opLine) {
        if (ch === '+' || ch === '*') {
          operations.push(ch);
        }
      }

      let total = 0;
      let numbers: number[] = [];

      for (let i = width - 1; i >= -1; i--) {
        // Boundary (separator) if:
        //  - we've passed the left edge (i === -1), or
        //  - this column is all spaces in all number rows
        const isBoundary =
          i === -1 || problems.every(row => row[i] === ' ');

        if (isBoundary) {
          // Close current problem (if we have collected any numbers)
          if (numbers.length > 0) {
            const op = operations.pop();
            if (!op) {
              throw new Error('Ran out of operations while processing problems.');
            }

            if (op === '+') {
              total += numbers.reduce((sum, x) => sum + x, 0);
            } else if (op === '*') {
              total += numbers.reduce((prod, x) => prod * x, 1);
            } else {
              throw new Error(`Unknown operator: ${op}`);
            }

            numbers = [];
          }
        } else {
          const columnChars = problems.map(row => row[i]).join('');
          const trimmed = columnChars.trim(); // removes leading/trailing spaces

          if (trimmed.length > 0) {
            numbers.push(Number(trimmed));
          }
        }
      }

      return `Total after part 2 rules: ${total}`;
  }
}
