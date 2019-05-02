function exportToSpreadsheet(members) {
  const spreadsheetUrl = PropertiesService.getScriptProperties().getProperty('EXPORT_SPREADSHEET_TARGET');
  const spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
  if(!spreadsheet) {
    throw 'Invalid target for configuration EXPORT_SPREADSHEET_TARGET: ' + spreadsheetUrl;
  }
  sheet = spreadsheet.getSheetByName('Export');
  sheet.clearContents();
  const propertyNames = {};
  members.forEach(function(properties) { 
    Object.keys(properties).forEach(function(propertyName) {
      if(!propertyNames[propertyName]) {
        propertyNames[propertyName] = 0;
      }
      propertyNames[propertyName] = propertyNames[propertyName] + 1;
    });                                  
  });
  
  const values = Object.keys(propertyNames);
  values.sort(function(a, b) {
    return propertyNames[b] - propertyNames[a];
  });
  sheet.appendRow(values);
  members.forEach(function(properties) { 
    row = new Array(values.length);
    Object.keys(properties).forEach(function(propertyName) {
      var content;
      if(!properties[propertyName]) {
        content = '';
      } else if(properties[propertyName] instanceof Array) {
        content = properties[propertyName].join(', ');
      } else if(properties[propertyName] instanceof Object) {
        content = JSON.stringify(properties[propertyName]);
      } else {
        content = properties[propertyName];
      }
      row[values.indexOf(propertyName)] = content;
    });
    sheet.appendRow(row);
  });

  return spreadsheetUrl;
}