function snapshot(spreadsheet, sheetNames, category) {
  const exported = export(spreadsheet, sheetNames, category);
  const snapshotEndpoint = PropertiesService.getScriptProperties().getProperty('SNAPSHOT_ENDPOINT');
  Logger.log('Using endpoint %s for spreadsheet %s', snapshotEndpoint, spreadsheet.getName());
  const response = postData(spreadsheet.getId(), exported, snapshotEndpoint);
  log('server response as follows: %s', response);
  snapshotAllCalendarOfSpreadsheet(spreadsheet);
  return response;
}

// run this within Leads & Opportunities sheet only
function snapshotAll(spreadsheet) {
  const sheet = spreadsheet.getSheetByName('Accounts');
  if(!sheet) {
    log('No sheet Accounts found, is this %s a Opportunities sheet? ', spreadsheet.getId());
    return;
  }
  const mapping = getHeaderMapping(sheet);
  const accounts = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getDisplayValues();
  const entries = convertToEntries(accounts, mapping);
  const responses = entries.map(function(entry) { 
    if(!entry.timesheet) {
      log('No timesheet or invalid format for client %s: %s', entry.client, entry.timesheet);
      return null;
    }
    const timesheet = SpreadsheetApp.openByUrl(entry.timesheet);
    try {
      return snapshot(timesheet, ['Timesheet', 'Balance'], 'Timesheet');
    } catch(e) {
       var errorSheet = spreadsheet.getSheetByName('Errors');
       lastRow = errorSheet.getLastRow();
       var cell = errorSheet.getRange('A1');
       cell.offset(lastRow, 0).setValue(e.message);
       cell.offset(lastRow, 1).setValue(e.fileName);
       cell.offset(lastRow, 2).setValue(e.lineNumber);
       cell.offset(lastRow, 3).setValue(entry.timesheet);
       cell.offset(lastRow, 4).setValue(entry.client);
       cell.offset(lastRow, 5).setValue(new Date());
    }
  });
}

// needs work, won't activate
/*
function change(e) {
  const spreadsheet = getActiveSpreadsheet()
  const changeEndpoint = PropertiesService.getScriptProperties().getProperty('CHANGE_ENDPOINT');
  const response = postData(spreadsheet, changeEndpoint, e);
  Logger.log(response);
}
*/