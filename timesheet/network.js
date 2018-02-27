function postData(spreadsheet, endpoint, data) {
  const id = spreadsheet.getId();
  const name = spreadsheet.getName();
  const timezone = spreadsheet.getSpreadsheetTimeZone();
  const payload = {id:id, name: name, timezone: timezone, data: data};
  const payloadString = JSON.stringify(payload);
  Logger.log(payloadString);
  const options = {
    method : 'post',
    contentType: 'application/json',
    payload: payloadString
  };
  return UrlFetchApp.fetch(endpoint, options);
}