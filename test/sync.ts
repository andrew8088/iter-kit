import { describe, it, expect } from "vitest";
import {
  range,
  chars,
  concat,
  filter,
  map,
  take,
  takeWhile,
  zip,
  pipe,
} from "../src/sync";
import { expectArray } from "./testUtils";

describe("sync", () => {
  describe("map", () => {
    it("maps", () => {
      expectArray(chars("a", "c"), ["a", "b", "c"]);
    });
  });

  describe("concat", () => {
    it("concatenates multiple iterators together", () => {
      expectArray(
        concat(range(0, 1), range(101, 103), range(-3, -2)),
        [0, 1, 101, 102, 103, -3, -2]
      );
    });
  });

  describe("filter", () => {
    it("filters", () => {
      expectArray(
        filter(range(0, 3), (n) => n % 2 === 0),
        [0, 2]
      );
    });
  });

  describe("map", () => {
    it("maps", () => {
      expectArray(
        map(range(0, 3), (n) => n - 2),
        [-2, -1, 0, 1]
      );
    });
  });

  describe("range", () => {
    it("includes start and end", () => {
      expectArray(range(0, 3), [0, 1, 2, 3]);
    });

    it("is empty if end is greater than start", () => {
      expectArray(range(3, 0), []);
    });

    it("includes 1 item if start and end are the same", () => {
      expectArray(range(3, 3), [3]);
    });

    it("goes to infinity if no end is provided", () => {
      const arr = Array.from(take(range(0), 10_000));
      expect(arr.length).toEqual(10000);
      for (let i = 0; i < arr.length; i++) {
        expect(arr[i]).toBe(i);
      }
    });

    it("starts at zero if no start is provided", () => {
      const arr = Array.from(take(range(), 10_000));
      expect(arr.length).toEqual(10000);
      for (let i = 0; i < arr.length; i++) {
        expect(arr[i]).toBe(i);
      }
    });
  });

  describe("take", () => {
    it("chooses a number of elements", () => {
      expectArray(take(range(), 2), [0, 1]);
    });

    it("ends early if the Iterator has fewer elements than needed", () => {
      expectArray(take(take(range(), 2), 3), [0, 1]);
    });
  });

  describe("takeUntil", () => {
    it("takes values until one matches a predicate", () => {
      expectArray(
        takeWhile(concat(range(0, 3), range(0, 3)), (n) => n < 3),
        [0, 1, 2]
      );
    });
  });

  describe("zip", () => {
    it("zips elements of multiple iterators", () => {
      const i1 = range();
      const i2 = chars();

      const i3 = take(zip(i1, i2), 2);
      expectArray(i3, [
        [0, "a"],
        [1, "b"],
      ]);
    });
  });

  describe("pipe", () => {
    it("pipes", () => {
      const noPipe = filter(
        map(
          zip(
            take(range(1, 10), 5),
            takeWhile(
              chars("a", "j"),
              (c) => c.charCodeAt(0) <= "e".charCodeAt(0)
            )
          ),
          ([n, s]) => "".padStart(n, s)
        ),
        (s) => s.includes("c")
      );

      const withPipe = pipe(chars("a", "j"))
        .takeWhile((c) => c.charCodeAt(0) <= "e".charCodeAt(0))
        .zip(pipe(range(1, 10)).take(5))
        .map(([s, n]) => "".padStart(n, s))
        .filter((s) => s.includes("c"));

      expectArray(noPipe, ["ccc"]);
      expectArray(withPipe, ["ccc"]);
    });
  });
});
