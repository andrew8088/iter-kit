import { describe, it } from "vitest";
import {
  map,
  range,
  filter,
  chars,
  zip,
  take,
  takeWhile,
  concat,
  pipe,
  tee,
} from "../src/async";
import { expectAsyncArray } from "./testUtils";

describe("async", () => {
  describe("filter", () => {
    it("filter", async () => {
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

  describe("take", () => {
    it("takes", async () => {
      await expectAsyncArray(take(chars("a", "z"), 3), ["a", "b", "c"]);
    });
  });

  describe("takeWhile", () => {
    it("takes while", async () => {
      await expectAsyncArray(
        takeWhile(chars("a", "z"), (c) => c.charCodeAt(0) < "d".charCodeAt(0)),
        ["a", "b", "c"]
      );
    });
  });

  describe("concat", () => {
    it("concats", async () => {
      await expectAsyncArray(
        concat<string | number>(range(0, 2), chars("a", "c")),
        [0, 1, 2, "a", "b", "c"]
      );
    });
  });

  describe("pipe", () => {
    it("pipes", async () => {
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

      await expectAsyncArray(noPipe, ["ccc"]);
      await expectAsyncArray(withPipe, ["ccc"]);
    });
  });

  describe("tee", () => {
    it("tees 2", async () => {
      const [i1, i2] = tee(range(0, 2));

      await expectAsyncArray(i1, [0, 1, 2]);
      await expectAsyncArray(i2, [0, 1, 2]);
    });
  });
});
