import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';
import { concat } from 'rxjs';

@Injectable()
export class Day3Solution implements DaySolution {
  readonly day = 3;
  readonly name = 'Day 3 placeholder';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day3.txt or via --input/--raw flags.';
    }

    let lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    let totalScore = 0;
    for (let line of lines) {
      let lineArr = line.split('');
      let lastArrEl = lineArr.pop()
      let firstDigit = Math.max(...lineArr.map(c => parseInt(c, 10)));
      let firstDigitIndex = lineArr.indexOf(firstDigit.toString());
      let arrAfterFirstDigit = lineArr.slice(firstDigitIndex + 1);
      arrAfterFirstDigit.push(lastArrEl!);
      let secondDigit = Math.max(...arrAfterFirstDigit.map(c => parseInt(c, 10)));
      console.log(`First digit: ${firstDigit}, Second digit: ${secondDigit}, Product: ${firstDigit * secondDigit}`);
      totalScore += parseInt(firstDigit.toString().concat(secondDigit.toString())); 
    }

    return `Total score: ${totalScore}`;
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day3.txt or via --input/--raw flags.';
    }

    let lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    let totalScore = 0;

    for (let line of lines) {
      let lineArr = line.split('');

      // get elements before index -11
      let firstPart = lineArr.slice(0, -11);
      console.log(`First part: ${firstPart}`);
      // get max element from firstPart
      let firstDigit = Math.max(...firstPart.map(c => parseInt(c, 10)));
      let firstDigitIndex = lineArr.indexOf(firstDigit.toString());

      // second digit
      let secondPart = lineArr.slice(firstDigitIndex + 1, -10);
      console.log(`Second part: ${secondPart}`);
      let secondDigit = Math.max(...secondPart.map(c => parseInt(c, 10)));
      let secondDigitIndex = lineArr.indexOf(secondDigit.toString(), firstDigitIndex + 1);

      // third digit
      let thirdPart = lineArr.slice(secondDigitIndex + 1, -9);
      let thirdDigit = Math.max(...thirdPart.map(c => parseInt(c, 10)));
      let thirdDigitIndex = lineArr.indexOf(thirdDigit.toString(), secondDigitIndex + 1);

      // fourth digit
      let fourthPart = lineArr.slice(thirdDigitIndex + 1, -8);
      let fourthDigit = Math.max(...fourthPart.map(c => parseInt(c, 10)));
      let fourthDigitIndex = lineArr.indexOf(fourthDigit.toString(), thirdDigitIndex + 1);

      // fifth digit
      let fifthPart = lineArr.slice(fourthDigitIndex + 1, -7);
      let fifthDigit = Math.max(...fifthPart.map(c => parseInt(c, 10)));
      let fifthDigitIndex = lineArr.indexOf(fifthDigit.toString(), fourthDigitIndex + 1);

      // sixth digit
      let sixthPart = lineArr.slice(fifthDigitIndex + 1, -6);
      let sixthDigit = Math.max(...sixthPart.map(c => parseInt(c, 10)));
      let sixthDigitIndex = lineArr.indexOf(sixthDigit.toString(), fifthDigitIndex + 1);

      // seventh digit
      let seventhPart = lineArr.slice(sixthDigitIndex + 1, -5);
      let seventhDigit = Math.max(...seventhPart.map(c => parseInt(c, 10)));
      let seventhDigitIndex = lineArr.indexOf(seventhDigit.toString(), sixthDigitIndex + 1);

      // eighth digit
      let eighthPart = lineArr.slice(seventhDigitIndex + 1, -4);
      let eighthDigit = Math.max(...eighthPart.map(c => parseInt(c, 10)));
      let eighthDigitIndex = lineArr.indexOf(eighthDigit.toString(), seventhDigitIndex + 1);

      // ninth digit
      let ninthPart = lineArr.slice(eighthDigitIndex + 1, -3);
      let ninthDigit = Math.max(...ninthPart.map(c => parseInt(c, 10)));
      let ninthDigitIndex = lineArr.indexOf(ninthDigit.toString(), eighthDigitIndex + 1);

      // tenth digit
      let tenthPart = lineArr.slice(ninthDigitIndex + 1, -2);
      let tenthDigit = Math.max(...tenthPart.map(c => parseInt(c, 10)));
      let tenthDigitIndex = lineArr.indexOf(tenthDigit.toString(), ninthDigitIndex + 1);

      // eleventh digit
      let eleventhPart = lineArr.slice(tenthDigitIndex + 1, -1);
      let eleventhDigit = Math.max(...eleventhPart.map(c => parseInt(c, 10)));
      let eleventhDigitIndex = lineArr.indexOf(eleventhDigit.toString(), tenthDigitIndex + 1);

      // twelfth digit
      let twelfthPart = lineArr.slice(eleventhDigitIndex + 1);
      let twelfthDigit = Math.max(...twelfthPart.map(c => parseInt(c, 10)));

      console.log(`Digits: ${firstDigit}, ${secondDigit}, ${thirdDigit}, ${fourthDigit}, ${fifthDigit}, ${sixthDigit}, ${seventhDigit}, ${eighthDigit}, ${ninthDigit}, ${tenthDigit}, ${eleventhDigit}, ${twelfthDigit}`);

      totalScore += parseInt(
        firstDigit.toString().concat(
          secondDigit.toString(),
          thirdDigit.toString(),
          fourthDigit.toString(),
          fifthDigit.toString(),
          sixthDigit.toString(),
          seventhDigit.toString(),
          eighthDigit.toString(),
          ninthDigit.toString(),
          tenthDigit.toString(),
          eleventhDigit.toString(),
          twelfthDigit.toString()
        ),
        10
      );
    }

    return `Total score: ${totalScore}`;
  }
}
