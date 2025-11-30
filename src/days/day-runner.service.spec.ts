import { DayRunnerService } from './day-runner.service';
import { DaySolution } from './day-solution';

const createSolution = (day: number): DaySolution => ({
  day,
  name: `Day ${day}`,
  partOne: (input: string) => `${day}-1-${input}`,
  partTwo: (input: string) => `${day}-2-${input}`,
});

describe('DayRunnerService', () => {
  it('lists available days in numerical order', () => {
    const service = new DayRunnerService([
      createSolution(2),
      createSolution(1),
    ]);

    expect(service.listDays()).toEqual([
      { day: 1, name: 'Day 1' },
      { day: 2, name: 'Day 2' },
    ]);
  });

  it('runs the requested parts', async () => {
    const service = new DayRunnerService([createSolution(1)]);

    const result = await service.run({ day: 1, part: 'both', rawInput: 'ok' });

    expect(result.partResults).toEqual([
      { part: '1', result: '1-1-ok' },
      { part: '2', result: '1-2-ok' },
    ]);
    expect(result.inputSource).toBe('inline input');
  });

  it('throws for missing day', async () => {
    const service = new DayRunnerService([]);

    await expect(
      service.run({ day: 99, part: '1', rawInput: 'x' }),
    ).rejects.toThrow('No implementation for day 99.');
  });
});
