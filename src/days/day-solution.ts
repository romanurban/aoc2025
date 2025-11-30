export type DayPart = '1' | '2' | 'both';
export type DayResult = string | number | void;

export interface DaySolution {
  day: number;
  name: string;
  partOne(input: string): Promise<DayResult> | DayResult;
  partTwo(input: string): Promise<DayResult> | DayResult;
}
