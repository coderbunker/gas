function setDate(dateStr) {
  var date = new Date(dateStr);
  date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000);
  return date;
}

function getScriptPropertyByName(name) {
  var scriptProps = PropertiesService.getScriptProperties();
  return scriptProps.getProperty(name);
}

function get2DigitNum(number) {
  return ("0" + number).slice(-2);
}

function findLastRow(sheet) {
  var dataRange = sheet.getDataRange();
  return dataRange.getLastRow() + 1;
}

function findCellPosByKeyword(keyword, sheet) {
  var textFinder = sheet.createTextFinder(keyword);
  var cell = textFinder.findNext();
  var rowId = cell.getRow();
  var colId = cell.getColumn();
  return { rowId: rowId, colId: colId };
}
