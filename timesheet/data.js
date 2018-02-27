function export(spreadsheet) {
  const sheet = spreadsheet.getSheetByName('Timesheet');
  //const timesheet = sheet.getSheetValues(1, 1, -1, -1).getDisplayValues();
  //https://developers.google.com/apps-script/reference/spreadsheet/sheet
  const timesheet = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getDisplayValues();
  const mapping = {
    'month': 0,
    'date': 1,
    'start': 2,
    'stop': 3,
    'hours': 4,
    'resource': 5,
    'task name': 6,
    'activity': 7
  }
  
  const entries = [];
  for(row in timesheet) {
    if(row == 0) {
      continue;
    }
    var entry = convert(timesheet[row], mapping);
    if(entry.resource.length == 0) {
      continue;
    }
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