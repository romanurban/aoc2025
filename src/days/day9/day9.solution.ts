import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';

@Injectable()
export class Day9Solution implements DaySolution {
  readonly day = 9;
  readonly name = 'Day 9 placeholder';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day9.txt or via --input/--raw flags.';
    }

    let lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // parse coordinates once and filter out invalid lines
    const coords = lines
      .map(l => l.split(',').map(Number))
      .filter(pair => pair.length === 2 && Number.isFinite(pair[0]) && Number.isFinite(pair[1])) as [number, number][];

    // Track largest inclusive-area for each coordinate key "x,y"
    const maxAreaPerCoord = new Map<string, number>();
    for (let i = 0; i < coords.length; i++) {
      const [x, y] = coords[i];
      const key = `${x},${y}`;
      for (let j = 0; j < coords.length; j++) {
        if (i === j) continue;
        const [ix, iy] = coords[j];
        const dx = Math.abs(x - ix);
        const dy = Math.abs(y - iy);
        // inclusive tile count between coordinates
        const area = (dx + 1) * (dy + 1); // inclusive
        const cur = maxAreaPerCoord.get(key) ?? 0;
        if (area > cur) maxAreaPerCoord.set(key, area);
      }
    }

    const largestArea = maxAreaPerCoord.size > 0
      ? Math.max(...Array.from(maxAreaPerCoord.values()))
      : 0;

    return largestArea;
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day9.txt or via --input/--raw flags.';
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    const redTiles = lines
      .map(l => l.split(',').map(Number))
      .filter(pair => pair.length === 2 && Number.isFinite(pair[0]) && Number.isFinite(pair[1])) as [number, number][];

    if (redTiles.length < 2) return 0;

    // Build all loop segments
    const segments: { x1: number; y1: number; x2: number; y2: number; vertical: boolean }[] = [];
    for (let i = 0; i < redTiles.length; i++) {
      const [x1, y1] = redTiles[i];
      const [x2, y2] = redTiles[(i + 1) % redTiles.length];
      segments.push({ x1, y1, x2, y2, vertical: x1 === x2 });
    }

    // Ray casting: count vertical segments to the left with y in [yMin, yMax)
    const isInside = (px: number, py: number): boolean => {
      let crossings = 0;
      for (const s of segments) {
        if (s.vertical && s.x1 < px) {
          const yMin = Math.min(s.y1, s.y2);
          const yMax = Math.max(s.y1, s.y2);
          if (py >= yMin && py < yMax) crossings++;
        }
      }
      return crossings % 2 === 1;
    };

    // Check if point is on any segment
    const isOnBoundary = (px: number, py: number): boolean => {
      for (const s of segments) {
        if (s.vertical) {
          if (px === s.x1 && py >= Math.min(s.y1, s.y2) && py <= Math.max(s.y1, s.y2)) return true;
        } else {
          if (py === s.y1 && px >= Math.min(s.x1, s.x2) && px <= Math.max(s.x1, s.x2)) return true;
        }
      }
      return false;
    };

    const isValid = (px: number, py: number) => isOnBoundary(px, py) || isInside(px, py);

    // Rectangle is valid if all 4 corners valid AND no segment passes through interior
    const rectangleIsValid = (ax: number, ay: number, bx: number, by: number): boolean => {
      const minX = Math.min(ax, bx), maxX = Math.max(ax, bx);
      const minY = Math.min(ay, by), maxY = Math.max(ay, by);

      // Check 4 corners
      if (!isValid(minX, minY) || !isValid(maxX, minY) ||
          !isValid(minX, maxY) || !isValid(maxX, maxY)) return false;

      // Check no segment passes through interior (strictly inside bounds)
      for (const s of segments) {
        if (s.vertical) {
          if (s.x1 > minX && s.x1 < maxX && Math.max(s.y1, s.y2) > minY && Math.min(s.y1, s.y2) < maxY) return false;
        } else {
          if (s.y1 > minY && s.y1 < maxY && Math.max(s.x1, s.x2) > minX && Math.min(s.x1, s.x2) < maxX) return false;
        }
      }
      return true;
    };

    let largestArea = 0;
    for (let i = 0; i < redTiles.length; i++) {
      for (let j = i + 1; j < redTiles.length; j++) {
        const [x1, y1] = redTiles[i];
        const [x2, y2] = redTiles[j];
        if (x1 === x2 || y1 === y2) continue;

        if (rectangleIsValid(x1, y1, x2, y2)) {
          const area = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
          largestArea = Math.max(largestArea, area);
        }
      }
    }

    return largestArea;
  }
}
