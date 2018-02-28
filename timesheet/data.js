function export(spreadsheet) {
  const sheet = spreadsheet.getSheetByName('Timesheet');
  //const timesheet = sheet.getSheetValues(1, 1, -1, -1).getDisplayValues();
  //https://developers.google.com/apps-script/reference/spreadsheet/sheet
  const timesheet = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getDisplayValues();
  const mapping = getHeaderMapping(sheet);
  
  return convertToEntries(timesheet, mapping)
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
//    if(entry.resource.length == 0) {
//      continue;
//    }
    Logger.log(entry);
    entries.push(entry);
  }
  return entries;
}

function convert(row, mapping) {
  const row_dict = {}
  Object.keys(mapping).map(function(k) { 
    row_dict[k] = row[mapping[k]]; 
  });
  return row_dict;
}