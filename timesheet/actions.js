function snapshot(spreadsheet) {
  const exported = export(SpreadsheetApp.getActiveSpreadsheet());
  const spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
  const snapshotEndpoint = PropertiesService.getScriptProperties().getProperty('SNAPSHOT_ENDPOINT') + '/' + spreadsheetId;
  const response = postData(snapshotEndpoint, exported);
  Logger.log(response);
}

function change(e) {
  const spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
  const endpoint = PropertiesService.getScriptProperties().getProperty('CHANGE_ENDPOINT') + '/' + spreadsheetId;
  const response = postData(endpoint, e);
  Logger.log(response);
}