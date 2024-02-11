import { getDifferenceColor } from "./utils";

test("useDifferenceColor - weight equals goalWeight", () => {
  const weight = 100;
  const goalWeight = 100;
  const expectedColor = "#006400";
  const { diffColor, diffWeight } = getDifferenceColor(weight, goalWeight);
  const expectedDiffWeight = weight - goalWeight;
  expect(diffWeight).toBe(expectedDiffWeight);
  expect(diffColor).toBe(expectedColor);
});

test("useDifferenceColor - weight greater than goalWeight by 1.5", () => {
  const weight = 100;
  const goalWeight = 98.5;
  const expectedColor = "#228B22";
  const { diffColor, diffWeight } = getDifferenceColor(weight, goalWeight);
  const expectedDiffWeight = 1.5;
  expect(diffWeight).toBe(expectedDiffWeight);
  expect(diffColor).toBe(expectedColor);
});

test("useDifferenceColor - weight greater than goalWeight by 3", () => {
  const weight = 100;
  const goalWeight = 97;
  const expectedColor = "#32CD32";
  const { diffColor, diffWeight } = getDifferenceColor(weight, goalWeight);
  const expectedDiffWeight = weight - goalWeight;
  expect(diffWeight).toBe(expectedDiffWeight);
  expect(diffColor).toBe(expectedColor);
});

test("useDifferenceColor - weight greater than goalWeight by 4.5", () => {
  const weight = 100;
  const goalWeight = 95.5;
  const expectedColor = "#9ACD32";
  const { diffColor, diffWeight } = getDifferenceColor(weight, goalWeight);
  const expectedDiffWeight = weight - goalWeight;
  expect(diffWeight).toBe(expectedDiffWeight);
  expect(diffColor).toBe(expectedColor);
});

test("useDifferenceColor - weight greater than goalWeight by 6", () => {
  const weight = 100;
  const goalWeight = 94;
  const expectedColor = "#FFFF00";
  const { diffColor, diffWeight } = getDifferenceColor(weight, goalWeight);
  const expectedDiffWeight = weight - goalWeight;
  expect(diffWeight).toBe(expectedDiffWeight);
  expect(diffColor).toBe(expectedColor);
});

test("useDifferenceColor - weight greater than goalWeight by 7.5", () => {
  const weight = 100;
  const goalWeight = 92.5;
  const expectedColor = "#FFD700";
  const { diffColor, diffWeight } = getDifferenceColor(weight, goalWeight);
  const expectedDiffWeight = weight - goalWeight;
  expect(diffWeight).toBe(expectedDiffWeight);
  expect(diffColor).toBe(expectedColor);
});

test("useDifferenceColor - weight greater than goalWeight by 9", () => {
  const weight = 100;
  const goalWeight = 91;
  const expectedColor = "#FFA500";
  const { diffColor, diffWeight } = getDifferenceColor(weight, goalWeight);
  const expectedDiffWeight = weight - goalWeight;
  expect(diffWeight).toBe(expectedDiffWeight);
  expect(diffColor).toBe(expectedColor);
});

test("useDifferenceColor - weight greater than goalWeight by 10.5", () => {
  const weight = 100;
  const goalWeight = 89.5;
  const expectedColor = "#FF8C00";
  const { diffColor, diffWeight } = getDifferenceColor(weight, goalWeight);
  const expectedDiffWeight = weight - goalWeight;
  expect(diffWeight).toBe(expectedDiffWeight);
  expect(diffColor).toBe(expectedColor);
});

test("useDifferenceColor - weight greater than goalWeight by 12", () => {
  const weight = 100;
  const goalWeight = 88;
  const expectedColor = "#FF4500";
  const { diffColor, diffWeight } = getDifferenceColor(weight, goalWeight);
  const expectedDiffWeight = weight - goalWeight;
  expect(diffWeight).toBe(expectedDiffWeight);
  expect(diffColor).toBe(expectedColor);
});

test("useDifferenceColor - weight greater than goalWeight by 15", () => {
  const weight = 100;
  const goalWeight = 85;
  const expectedColor = "#980505";
  const { diffColor, diffWeight } = getDifferenceColor(weight, goalWeight);
  const expectedDiffWeight = weight - goalWeight;
  expect(diffWeight).toBe(expectedDiffWeight);
  expect(diffColor).toBe(expectedColor);
});
