import { oni } from "@/index";
import { expect, test } from "vitest";

const end = async (x: number) => x;
const mid = async (x: number, next: () => Promise<number>) => {
  const result = await next();
  return result + x;
};

const twice_next = async (x: number, next: () => Promise<number>) => {
  await next();
  const result = await next();
  return result + x;
};

test("normal", async () => {
  const result = await oni<number, number>([mid, mid, mid], end)(1);
  expect(result).toBe(4);
});

test("twice_next", async () => {
  let count = 0;
  const result = await oni<number, number>(
    [twice_next, mid, mid],
    async (x) => {
      count++;
      return x;
    }
  )(1);
  expect(result).toBe(4);
  expect(count).toBe(1);
});
