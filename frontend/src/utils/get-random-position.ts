import { getRandomNumber } from "./get-random-number";

export function getRandomPosition(width: number, height: number) {
  return [getRandomNumber(0, width), getRandomNumber(0, height)];
}
