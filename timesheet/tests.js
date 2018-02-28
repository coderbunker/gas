function test_postData() {
  const result = postData(getActiveSpreadsheet(), 'http://localhost/api/spreadsheet', [{data:1}]);
  Logger.log(result);
}

function test_getHeaderMapping() {
  const sheet = getActiveSpreadsheet().getSheetByName('Timesheet');
  const mapping = getHeaderMapping(sheet);
  Logger.log(mapping);
}

function test_snapshotAll() {
  snapshotAll();
}