import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';

@Injectable()
export class Day8Solution implements DaySolution {
  readonly day = 8;
  readonly name = 'Playground';

  partOne(input: string): DayResult {
    const points = input.trim().split('\n').map(l => l.split(',').map(Number));
    const n = points.length;
    const parent = points.map((_, i) => i);
    const find = (x: number): number => parent[x] === x ? x : (parent[x] = find(parent[x]));
    const union = (a: number, b: number) => { parent[find(a)] = find(b); };

    const edges = new Set<string>();
    for (let iter = 0; iter < 1000; iter++) {
      let best = { d: Infinity, i: -1, j: -1 };
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (edges.has(`${i},${j}`)) continue;
          const d = Math.hypot(points[i][0] - points[j][0], points[i][1] - points[j][1], points[i][2] - points[j][2]);
          if (d < best.d) best = { d, i, j };
        }
      }
      edges.add(`${best.i},${best.j}`);
      union(best.i, best.j);
    }

    const sizes = new Map<number, number>();
    for (let i = 0; i < n; i++) sizes.setinit(find(i), (sizes.get(find(i)) || 0) + 1);
    const sorted = [...sizes.values()].sort((a, b) => b - a);
    return sorted[0] * sorted[1] * sorted[2];
  }

  partTwo(input: string): DayResult {
    const points = input.trim().split('\n').map(l => l.split(',').map(Number));
    const n = points.length;
    const parent = points.map((_, i) => i);
    const find = (x: number): number => parent[x] === x ? x : (parent[x] = find(parent[x]));
    const union = (a: number, b: number) => { parent[find(a)] = find(b); };

    const edges = new Set<string>();
    let circuits = n;
    while (circuits > 1) {
      let best = { d: Infinity, i: -1, j: -1 };
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (edges.has(`${i},${j}`)) continue;
          const d = Math.hypot(points[i][0] - points[j][0], points[i][1] - points[j][1], points[i][2] - points[j][2]);
          if (d < best.d) best = { d, i, j };
        }
      }
      edges.add(`${best.i},${best.j}`);
      if (find(best.i) !== find(best.j)) {
        union(best.i, best.j);
        circuits--;
        if (circuits === 1) return points[best.i][0] * points[best.j][0];
      }
    }
    return 0;
  }
}
