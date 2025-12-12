import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';

type Shape = number[][]; // list of [row, col] coordinates relative to top-left

@Injectable()
export class Day12Solution implements DaySolution {
  readonly day = 12;
  readonly name = 'Christmas Tree Farm';

  parseInput(input: string) {
    let lines = input.split('\n');

    // Parse shapes - each shape starts with "N:"
    let shapes: Shape[][] = []; // shapes[shapeIndex] = array of all rotations/flips
    let regions: { width: number; height: number; counts: number[] }[] = [];

    let i = 0;
    while (i < lines.length) {
      let line = lines[i].trim();

      // Check if it's a shape definition (starts with digit followed by colon)
      let shapeMatch = line.match(/^(\d+):$/);
      if (shapeMatch) {
        let shapeIndex = parseInt(shapeMatch[1], 10);
        i++;

        // Read shape lines until we hit empty line or next section
        let shapeLines: string[] = [];
        while (i < lines.length && lines[i].trim() !== '' && !lines[i].match(/^\d+:$/) && !lines[i].match(/^\d+x\d+:/)) {
          shapeLines.push(lines[i]);
          i++;
        }

        // Parse base shape as coordinates
        let baseCoords: number[][] = [];
        for (let r = 0; r < shapeLines.length; r++) {
          for (let c = 0; c < shapeLines[r].length; c++) {
            if (shapeLines[r][c] === '#') {
              baseCoords.push([r, c]);
            }
          }
        }

        // Generate all rotations and flips
        let allVariants = this.generateAllVariants(baseCoords);
        shapes[shapeIndex] = allVariants;
        continue;
      }

      // Check if it's a region definition
      let regionMatch = line.match(/^(\d+)x(\d+):\s*(.+)/);
      if (regionMatch) {
        let width = parseInt(regionMatch[1], 10);
        let height = parseInt(regionMatch[2], 10);
        let counts = regionMatch[3].split(/\s+/).map(n => parseInt(n, 10));
        regions.push({ width, height, counts });
      }

      i++;
    }

    return { shapes, regions };
  }

  generateAllVariants(coords: number[][]): Shape[] {
    let variants: Shape[] = [];
    let seen = new Set<string>();

    let current = coords;
    for (let flip = 0; flip < 2; flip++) {
      for (let rot = 0; rot < 4; rot++) {
        let normalized = this.normalizeShape(current);
        let key = JSON.stringify(normalized);
        if (!seen.has(key)) {
          seen.add(key);
          variants.push(normalized);
        }
        current = this.rotate90(current);
      }
      current = this.flipHorizontal(coords);
    }

    return variants;
  }

  rotate90(coords: number[][]): number[][] {
    // Rotate 90 degrees clockwise: (r, c) -> (c, -r)
    return coords.map(([r, c]) => [c, -r]);
  }

  flipHorizontal(coords: number[][]): number[][] {
    return coords.map(([r, c]) => [r, -c]);
  }

  normalizeShape(coords: number[][]): number[][] {
    if (coords.length === 0) return [];
    let minR = Math.min(...coords.map(([r, c]) => r));
    let minC = Math.min(...coords.map(([r, c]) => c));
    let normalized = coords.map(([r, c]) => [r - minR, c - minC]);
    normalized.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    return normalized;
  }

  canPlace(grid: boolean[][], shape: Shape, startR: number, startC: number, width: number, height: number): boolean {
    for (let [dr, dc] of shape) {
      let r = startR + dr;
      let c = startC + dc;
      if (r < 0 || r >= height || c < 0 || c >= width) return false;
      if (grid[r][c]) return false;
    }
    return true;
  }

  placeShape(grid: boolean[][], shape: Shape, startR: number, startC: number) {
    for (let [dr, dc] of shape) {
      grid[startR + dr][startC + dc] = true;
    }
  }

  removeShape(grid: boolean[][], shape: Shape, startR: number, startC: number) {
    for (let [dr, dc] of shape) {
      grid[startR + dr][startC + dc] = false;
    }
  }

  solve(grid: boolean[][], pieces: { variants: Shape[] }[], pieceIdx: number, width: number, height: number): boolean {
    if (pieceIdx >= pieces.length) return true;

    let piece = pieces[pieceIdx];
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        for (let variant of piece.variants) {
          if (this.canPlace(grid, variant, r, c, width, height)) {
            this.placeShape(grid, variant, r, c);
            if (this.solve(grid, pieces, pieceIdx + 1, width, height)) {
              return true;
            }
            this.removeShape(grid, variant, r, c);
          }
        }
      }
    }
    return false;
  }

  canFit(shapes: Shape[][], width: number, height: number, counts: number[]): boolean {
    // Build list of all pieces to place
    let pieces: { variants: Shape[] }[] = [];
    for (let shapeIdx = 0; shapeIdx < counts.length; shapeIdx++) {
      let count = counts[shapeIdx];
      for (let i = 0; i < count; i++) {
        pieces.push({ variants: shapes[shapeIdx] });
      }
    }

    if (pieces.length === 0) return true;

    // Check if total cells match
    let totalCells = 0;
    for (let shapeIdx = 0; shapeIdx < counts.length; shapeIdx++) {
      if (counts[shapeIdx] > 0 && shapes[shapeIdx] && shapes[shapeIdx][0]) {
        totalCells += counts[shapeIdx] * shapes[shapeIdx][0].length;
      }
    }
    if (totalCells > width * height) return false;

    let grid: boolean[][] = [];
    for (let r = 0; r < height; r++) {
      grid.push(new Array(width).fill(false));
    }

    return this.solve(grid, pieces, 0, width, height);
  }

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day12.txt or via --input/--raw flags.';
    }

    let { shapes, regions } = this.parseInput(input);

    let fitCount = 0;
    for (let region of regions) {
      if (this.canFit(shapes, region.width, region.height, region.counts)) {
        fitCount++;
      }
    }

    return fitCount;
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day12.txt or via --input/--raw flags.';
    }

    return 'Part two not implemented yet.';
  }
}
