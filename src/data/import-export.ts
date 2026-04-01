import type { AppSnapshot } from "./app-snapshot";

export function serializeSnapshot(snapshot: AppSnapshot): string {
  return JSON.stringify(snapshot, null, 2);
}

export function parseSnapshot(raw: string): AppSnapshot {
  return JSON.parse(raw) as AppSnapshot;
}
