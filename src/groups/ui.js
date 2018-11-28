function onOpen() {
  const orgName = PropertiesService.getScriptProperties().getProperty('ORG_NAME');
  SpreadsheetApp.getUi()
      .createMenu(orgName)
      .addItem('Snapshot Groups', 'snapshotCaptureOutput')
      .addToUi();
}

function getOutputSheet(spreadsheet) {
  var sheet = spreadsheet.getSheetByName('Snapshot Groups');
  if(!sheet) {
    sheet = spreadsheet.insertSheet('Snapshot Groups');
  } else { 
    sheet.clear();
  }
  return sheet;
}

function snapshotCaptureOutput() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const timezone = spreadsheet.getSpreadsheetTimeZone();
  const endpoint = PropertiesService.getScriptProperties().getProperty('SNAPSHOT_ENDPOINT');
  const sheet = getOutputSheet(spreadsheet);
  snapshot(endpoint, timezone, function(input, output) {
    sheet.appendRow([input, output]);
  });
}