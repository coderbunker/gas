function snapshot() {
  const spreadsheet = getActiveSpreadsheet();
  const exported = export(spreadsheet);
  const snapshotEndpoint = PropertiesService.getScriptProperties().getProperty('SNAPSHOT_ENDPOINT');
  const response = postData(spreadsheet, snapshotEndpoint, exported);
  Logger.log(response);
}

function change(e) {
  const spreadsheet = getActiveSpreadsheet()
  const changeEndpoint = PropertiesService.getScriptProperties().getProperty('CHANGE_ENDPOINT');
  const response = postData(spreadsheet, changeEndpoint, e);
  Logger.log(response);
}