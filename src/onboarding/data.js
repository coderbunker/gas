function export(spreadsheet, sheetNames, category) {
  const id = spreadsheet.getId();
  const name = spreadsheet.getName();
  const timezone = spreadsheet.getSpreadsheetTimeZone();
  
  const obj = {
    id: id,
    name: name,
    timezone: timezone,
    apptype: 'Spreadsheet',
    category: category,
    sheets: { }
  };
  
  sheetNames.forEach(function(name) {
    var sheet = spreadsheet.getSheetByName(name);
    if(sheet) {
      obj['sheets'][name] = { data: exportSheet(spreadsheet, sheet) }
    } else {
      Logger.log('No sheet %s in %s', name, spreadsheet.getId());
    }
  });
  
  return obj;
}
  
function exportSheet(spreadsheet, sheet) {
  const data = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getDisplayValues();
  const mapping = getHeaderMapping(sheet);
  return convertToEntries(data, mapping)
}
  
function normalizeName(name) {
  return name.toLowerCase().split(' ').join('');
}
  
function getHeaderMapping(sheet) {
  const names = sheet.getRange(1, 1, 1,  sheet.getLastColumn()).getDisplayValues();
  const mapping = {}
  for(row in names) {
    for(column in names[row]) {
      mapping[normalizeName(names[row][column])] = column;
    }
  }
  return mapping;
}
  
function convertToEntries(data, mapping) {
  const entries = [];
  for(row in data) {
    var entry = convert(data[row], mapping);
    Logger.log(entry);
    entries.push(entry);
  }
  return entries;
}
  
function convert(row, mapping) {
  const row_dict = {}
  Object.keys(mapping).map(function(k) { 
    row_dict[k] = row[mapping[k]].trim(); 
  });
  return row_dict;
}