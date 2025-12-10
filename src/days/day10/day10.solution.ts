import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { DayResult, DaySolution } from '../day-solution';

interface Button {
  toggles: number[];
}

@Injectable()
export class Day10Solution implements DaySolution {
  readonly day = 10;
  readonly name = 'Day 10 placeholder';

  private parseButtons(buttonsStr: string): Button[] {
    const buttons: Button[] = [];
    const matches = buttonsStr.matchAll(/\(([^)]+)\)/g);
    for (const match of matches) {
      const toggles = match[1].split(',').map(n => parseInt(n.trim()));
      buttons.push({ toggles });
    }
    return buttons;
  }

  private stateToNumber(state: number[]): number {
    return state.reduce((acc, bit, i) => acc | (bit << i), 0);
  }

  private applyButton(state: number, button: Button): number {
    let newState = state;
    for (const pos of button.toggles) {
      newState ^= (1 << pos);
    }
    return newState;
  }

  private findMinPresses(buttons: Button[], target: number[]): number {
    const targetState = this.stateToNumber(target);
    const initialState = 0; // all LEDs off

    if (initialState === targetState) {
      return 0;
    }

    // BFS to find minimum button presses
    const visited = new Set<number>();
    const queue: { state: number; presses: number }[] = [
      { state: initialState, presses: 0 }
    ];
    visited.add(initialState);

    while (queue.length > 0) {
      const { state, presses } = queue.shift()!;

      for (let i = 0; i < buttons.length; i++) {
        const newState = this.applyButton(state, buttons[i]);

        if (newState === targetState) {
          return presses + 1;
        }

        if (!visited.has(newState)) {
          visited.add(newState);
          queue.push({ state: newState, presses: presses + 1 });
        }
      }
    }

    return -1; // no solution found
  }

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day10.txt or via --input/--raw flags.';
    }

    let totalPresses = 0;
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    for (const line of lines) {
      const indicator = line.split(']')[0] + ']';
      const buttonsStr = line.split(']')[1].trim().split('{')[0].trim();

      const ledTarget = indicator.slice(1, -1).split('').map(ch => ch === '#' ? 1 : 0);
      const buttons = this.parseButtons(buttonsStr);

      const minPresses = this.findMinPresses(buttons, ledTarget);
      totalPresses += minPresses;
    }

    return totalPresses;
  }

  private findMinJoltagePresses(buttons: Button[], targets: number[]): number {
    const numCounters = targets.length;
    const numButtons = buttons.length;

    // Build contribution matrix
    const contributions: number[][] = buttons.map(b => {
      const row = new Array(numCounters).fill(0);
      for (const pos of b.toggles) {
        row[pos] = 1;
      }
      return row;
    });

    // Generate SMT-LIB2 problem for Z3
    let smt = '(set-option :produce-models true)\n';

    // Declare button press count variables (non-negative integers)
    for (let i = 0; i < numButtons; i++) {
      smt += `(declare-const b${i} Int)\n`;
      smt += `(assert (>= b${i} 0))\n`;
    }

    // Declare total presses variable
    smt += '(declare-const total Int)\n';
    smt += `(assert (= total (+ ${Array.from({ length: numButtons }, (_, i) => `b${i}`).join(' ')})))\n`;

    // Add constraints: sum of contributions equals target for each counter
    for (let j = 0; j < numCounters; j++) {
      const terms: string[] = [];
      for (let i = 0; i < numButtons; i++) {
        if (contributions[i][j] > 0) {
          terms.push(`(* ${contributions[i][j]} b${i})`);
        }
      }
      if (terms.length > 0) {
        smt += `(assert (= (+ ${terms.join(' ')}) ${targets[j]}))\n`;
      } else {
        // No button affects this counter, target must be 0
        if (targets[j] !== 0) return -1;
      }
    }

    // Minimize total using binary search
    smt += '(minimize total)\n';
    smt += '(check-sat)\n';
    smt += '(get-value (total))\n';

    // Write to temp file and run z3
    const tmpFile = join(tmpdir(), `z3_day10_${Date.now()}.smt2`);
    writeFileSync(tmpFile, smt);

    try {
      const result = execSync(`z3 ${tmpFile}`, { encoding: 'utf-8' });
      unlinkSync(tmpFile);

      if (result.includes('sat')) {
        const match = result.match(/\(\(total (\d+)\)\)/);
        if (match) {
          return parseInt(match[1]);
        }
      }
      return -1;
    } catch {
      try { unlinkSync(tmpFile); } catch {}
      return -1;
    }
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day10.txt or via --input/--raw flags.';
    }

    let totalPresses = 0;
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    for (const line of lines) {
      const buttonsStr = line.split(']')[1].trim().split('{')[0].trim();
      const joltageStr = line.split('{')[1].split('}')[0];

      const buttons = this.parseButtons(buttonsStr);
      const targets = joltageStr.split(',').map(n => parseInt(n.trim()));

      const minPresses = this.findMinJoltagePresses(buttons, targets);
      totalPresses += minPresses;
    }

    return totalPresses;
  }
}
