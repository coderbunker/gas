function getHeaderMapping(sheet) {
  const names = sheet.getRange(1, 1, 1,  sheet.getLastColumn()).getDisplayValues();
  const mapping = {}
  for(row in names) {
    for(column in names[row]) {
      mapping[names[row][column]] = column;
    }
  }
  return mapping;
}