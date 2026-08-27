/** Student identity for HTML reports: Đỗ Văn Hà / MSSV 23127044 */
export const STUDENT_ID = '23127044';

/** ISO-8601 timestamp for report title/footer injection. */
export function isoTimestamp(date: Date = new Date()): string {
  return date.toISOString();
}

/**
 * Build a report title that visibly includes Run by metadata.
 * Example: `FR-04 Profile | Run by: 23127044 | 2026-08-26T16:39:00.000Z`
 */
export function reportTitle(feature: string): string {
  return `${feature} | Run by: ${STUDENT_ID} | ${isoTimestamp()}`;
}
