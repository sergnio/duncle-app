import { readableDate } from "./dateUtil";

test("Date utils test", () =>
  expect(readableDate("2021-02-06T00:00:00")).toBe("February 6th 2021"));
