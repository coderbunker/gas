function test_postData() {
  const result = postData(getActiveSpreadsheet(), 'http://localhost/api/spreadsheet', [{data:1}]);
  Logger.log(result);
}
