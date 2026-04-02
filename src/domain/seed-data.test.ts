import { createDemoSnapshot } from "./seed-data";

test("creates a Chinese demo snapshot with goals and catalog data", () => {
  const snapshot = createDemoSnapshot();

  expect(snapshot.goals.length).toBeGreaterThan(0);
  expect(snapshot.tasks.length).toBeGreaterThan(0);
  expect(snapshot.appearanceItems.length).toBeGreaterThan(0);
  expect(snapshot.stylePacks.length).toBeGreaterThan(0);
  expect(snapshot.goals[0]?.title).toBe("10 天 Python 入门");
  expect(snapshot.tasks[0]?.title).toContain("概念理解");
});
