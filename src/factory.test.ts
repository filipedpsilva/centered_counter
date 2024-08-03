import { expect, test } from "vitest";
import { factory } from "./factory";

// #region Original tests

test("creates a count function", function () {
  const count = factory(1, 1);
  expect(count()).toBe(2);
  expect(count()).toBe(3);
});

test("creates a count starting from 10 with a step of 5", function () {
  const count = factory(10, 5);
  expect(count()).toBe(15);
  expect(count()).toBe(20);
});

test("defaults to start 0, step 1 when no arguments passed", function () {
  const count = factory();
  expect(count()).toBe(1);
  expect(count()).toBe(2);
});

// #endregion Original tests

// #region New Proposed tests

test("creates a count starting from -100 with a step of 50", function () {
  const count = factory(-100, 50);
  expect(count()).toBe(-50);
  expect(count()).toBe(0);
  expect(count()).toBe(50);
});

test("creates a count starting from 100 with a step of -50", function () {
  const count = factory(100, -50);
  expect(count()).toBe(50);
  expect(count()).toBe(0);
  expect(count()).toBe(-50);
});

test("creates a count starting from 141592653589793 with a step of 141592653589793", function () {
  const count = factory(141_592_653_589_793, 141_592_653_589_793);
  expect(count()).toBe(283_185_307_179_586);
  expect(count()).toBe(424_777_960_769_379);
  expect(count()).toBe(566_370_614_359_172);
});

test("creates a count starting from 0 with a step of 0", function () {
  const count = factory(0, 0);
  expect(count()).toBe(0);
  expect(count()).toBe(0);
  expect(count()).toBe(0);
});

test("creates a count starting from 5 with a step of 0", function () {
  const count = factory(5, 0);
  expect(count()).toBe(5);
  expect(count()).toBe(5);
  expect(count()).toBe(5);
});

test("when no first argument passed, defaults to start a count starting from 0 with a step of 5", function () {
  const count = factory(undefined, 5);
  expect(count()).toBe(5);
  expect(count()).toBe(10);
  expect(count()).toBe(15);
});

test("when no second argument passed, defaults to start a count starting from 5 with a step of 1", function () {
  const count = factory(5, undefined);
  expect(count()).toBe(6);
  expect(count()).toBe(7);
  expect(count()).toBe(8);
});

// #endregion New Proposed tests