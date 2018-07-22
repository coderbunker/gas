function getOutputSheet(spreadsheet, sheetName) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if(!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  } else { 
    sheet.clear();
  }
  return sheet;
}

// similar to https://github.com/zixia/gasl/blob/master/src/gas-log-lib.js
function log() {
  // make a shiftable array from arguments
  var args = Array.prototype.slice.call(arguments)
  
  var message = ''
  try {
    args = args.map(function (v) { return (typeof v)==='undefined' ? 'undefined' : v })
    if (typeof args[0] != 'string') args[0] = String(args[0]) // compatible with log(new Date()) . or will cause error. 20160213
    message = Utilities.formatString.apply(null, args)
  } catch (e) {
    message = args.join(' !!! ') + e.name + ':' + e.message
  }
  Logger.log(message);

  return;
  
  // ????
  if(!this.sheet) {
    this.sheet = getOutputSheet(SpreadsheetApp.getActiveSpreadsheet(), 'Sync Output');
  }
  this.sheet.appendRow([message]);
}