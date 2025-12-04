// exportCsv utility
function escapeCell(cell) {
  if (cell === null || cell === undefined) return '';
  const s = String(cell);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
function toCsv(rows) {
  if (!rows || !rows.length) return 'No data\n';
  const keys = Object.keys(rows[0]);
  const lines = [keys.join(',')];
  for (const row of rows) {
    lines.push(keys.map(k => escapeCell(row[k])).join(','));
  }
  return lines.join('\n');
}
function downloadCsv(filename, rows) {
  const csv = toCsv(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.setAttribute('download', filename || 'report.csv');
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
window.exportCsvUtil = { toCsv, downloadCsv };
