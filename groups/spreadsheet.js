function insertIntoSpreadsheet(sheet, rows) {
  Object.keys(rows).forEach(function(r) {
    sheet.appendRow(rows[r]);
  });
}
