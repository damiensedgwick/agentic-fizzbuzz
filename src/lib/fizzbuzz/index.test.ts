import { expect, test } from "bun:test";
import { fizzbuzz } from ".";

test("fizzbuzz", () => {
  expect(fizzbuzz(1)).toBe("1");
  expect(fizzbuzz(2)).toBe("2");
  expect(fizzbuzz(3)).toBe("Fizz");
  expect(fizzbuzz(4)).toBe("4");
  expect(fizzbuzz(5)).toBe("Buzz");
  expect(fizzbuzz(6)).toBe("Fizz");
  expect(fizzbuzz(7)).toBe("7");
  expect(fizzbuzz(8)).toBe("8");
  expect(fizzbuzz(9)).toBe("Fizz");
  expect(fizzbuzz(10)).toBe("Buzz");
  expect(fizzbuzz(11)).toBe("11");
  expect(fizzbuzz(12)).toBe("Fizz");
  expect(fizzbuzz(13)).toBe("13");
  expect(fizzbuzz(14)).toBe("14");
  expect(fizzbuzz(15)).toBe("FizzBuzz");
});
