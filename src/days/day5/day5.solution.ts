import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';

@Injectable()
export class Day5Solution implements DaySolution {
  readonly day = 5;
  readonly name = 'Day 5 placeholder';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day5.txt or via --input/--raw flags.';
    }


    let ranges: { start: number; end: number }[] = [];
    let items: number[] = [];
    let lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    let counter = 0;
    for (let line of lines) {
      if (line.length > 0 && !line.includes('-')) {
        let item = parseInt(line, 10);
        items.push(item);
        console.log(`Added item: ${item}`);
      } else {
        let range = line.split('-');
        // we must fill the range with integers from start to end
        let start = parseInt(range[0], 10);
        let end = parseInt(range[1], 10);
        ranges.push({ start, end });
        console.log(`Added range: ${start} to ${end}`);
      }
    }

    for (let item of items) {
      for (let range of ranges) {
        if (item >= range.start && item <= range.end) {
          console.log(`Item ${item} is in range ${range.start}-${range.end}`);
          counter++;
          break;
        }
      }  
    }

    return `Total items in ranges: ${counter}`;
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day5.txt or via --input/--raw flags.';
    }

    // parse ranges as BigInt to avoid precision issues and avoid enumerating IDs
    let ranges: { start: bigint; end: bigint }[] = [];

    let lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    for (let line of lines) {
      if (line.includes('-')) {
        const parts = line.split('-').map(p => p.trim());
        if (parts.length !== 2) continue;
        try {
          let start = BigInt(parts[0]);
          let end = BigInt(parts[1]);
          if (start > end) [start, end] = [end, start];
          ranges.push({ start, end });
        } catch {
          // skip invalid numbers
          continue;
        }
      }
    }

    if (ranges.length === 0) return `Total unique fresh ingredient IDs: 0`;

    // sort by start
    ranges.sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));

    // merge overlapping/contiguous intervals
    const merged: { start: bigint; end: bigint }[] = [];
    for (const r of ranges) {
      if (merged.length === 0) {
        merged.push({ start: r.start, end: r.end });
        continue;
      }
      const last = merged[merged.length - 1];
      if (r.start <= last.end + 1n) {
        // overlapping or contiguous — extend end if needed
        if (r.end > last.end) last.end = r.end;
      } else {
        merged.push({ start: r.start, end: r.end });
      }
    }

    // sum lengths of merged intervals
    let total = 0n;
    for (const m of merged) {
      total += (m.end - m.start + 1n);
    }

    return `Total unique fresh ingredient IDs: ${total.toString()}`;
  }
}
