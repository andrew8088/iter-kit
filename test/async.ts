import { describe, it } from "vitest";
import { map, range, filter, chars, zip } from "../src/async";
import { expectAsyncArray } from "./testUtils";

describe("async", () => {
  describe("map", () => {
    it("maps", async () => {
      await expectAsyncArray(
        filter(range(0, 3), (n) => n % 2 === 0),
        [0, 2]
      );
    });
  });

  describe("map", () => {
    it("maps", async () => {
      await expectAsyncArray(
        map(range(0, 3, 0.5), (n) => n - 2),
        [-2, -1.5, -1, -0.5, 0, 0.5, 1]
      );
    });
  });

  describe("zip", () => {
    it("zips", async () => {
      const i1 = range(0, 3);
      const i2 = range(4, 7);
      const i3 = chars("a", "d");

      await expectAsyncArray(zip(i1, i2, i3), [
        [0, 4, "a"],
        [1, 5, "b"],
        [2, 6, "c"],
        [3, 7, "d"],
      ]);
    });
  });
});
