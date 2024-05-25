import { describe, expect, it } from "vitest";
import { parseDateFormat, formatDateTime } from "../../src/utils";
import { FormatStyle } from "@formkit/tempo";

describe("parseDateFormat", () => {
  it("should parse valid JSON input correctly", () => {
    const input = '{"dateStyle":"medium","timeStyle":"short"}';
    const expectedOutput = { dateStyle: "medium", timeStyle: "short" };
    expect(parseDateFormat(input)).toEqual(expectedOutput);
  });

  it("should return the input string if it is not valid JSON", () => {
    const input = "invalid JSON";
    expect(parseDateFormat(input)).toEqual(input);
  });
});

describe("formatDateTime", () => {
  it("should format datetime according to the provided format", () => {
    const isoDate = "2024-05-26T12:00:00Z";
    const dateFormat = { date: "short" as FormatStyle, time: "short" };
    const locale = "zh";
    const expectedOutput = "2024/5/26 21:00";
    expect(formatDateTime(isoDate, dateFormat, locale)).toEqual(expectedOutput);
  });
});
