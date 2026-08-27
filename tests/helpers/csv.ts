import * as fs from 'fs';

/**
 * Parse a simple CSV file into row objects keyed by header names.
 * Handles quoted fields with commas; does not require external deps.
 */
export function loadCsv(path: string): Record<string, string>[] {
  const raw = fs.readFileSync(path, 'utf-8');
  const lines = raw
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((l) => l.trimEnd())
    .filter((l) => l.length > 0);

  if (lines.length === 0) return [];

  const headers = parseCsvLine(lines[0]);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    const row: Record<string, string> = {};
    for (let c = 0; c < headers.length; c++) {
      row[headers[c]] = values[c] ?? '';
    }
    rows.push(row);
  }

  return rows;
}

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  let wasQuoted = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
      wasQuoted = true;
    } else if (ch === ',') {
      fields.push(wasQuoted ? current : current.trim());
      current = '';
      wasQuoted = false;
    } else {
      current += ch;
    }
  }
  fields.push(wasQuoted ? current : current.trim());
  return fields;
}
