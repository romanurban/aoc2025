import { Command } from 'commander';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppService } from './app.service';
import { DayPart } from './days/day-solution';

async function bootstrap(): Promise<void> {
  const program = new Command();
  program
    .name('aoc2025')
    .description('Nest-powered Advent of Code 2025 CLI runner')
    .option('-d, --day <number>', 'Day to run', (value) =>
      Number.parseInt(value, 10),
    )
    .option('-p, --part <part>', 'Part to run (1, 2, or both)', 'both')
    .option(
      '-i, --input <path>',
      'Path to puzzle input file (defaults to inputs/day{day}.txt)',
    )
    .option('-r, --raw <text>', 'Inline puzzle input text (overrides --input)')
    .option('-l, --list', 'List available days instead of running');

  program.parse(process.argv);
  const options = program.opts<{
    day?: number;
    part?: string;
    input?: string;
    raw?: string;
    list?: boolean;
  }>();
  const part = normalizePart(options.part);
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const appService = appContext.get(AppService);

  try {
    await appService.execute({
      day: options.day,
      part,
      input: options.input,
      rawInput: options.raw,
      list: options.list,
    });
  } catch (error) {
    console.error((error as Error).message);
    process.exitCode = 1;
  } finally {
    await appContext.close();
  }
}

function normalizePart(value?: string): DayPart {
  if (value === '1' || value === '2' || value === 'both') {
    return value;
  }

  return 'both';
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
