/**
 * Return either the current spreadsheet or the globally configured spreadsheet
 *
 * @return {Spreadsheet} the result
 */
function getActiveSpreadsheet() {
  var current = SpreadsheetApp.getActiveSpreadsheet();
  if(!current) {
    current = SpreadsheetApp.openByUrl(PropertiesService.getScriptProperties().getProperty('DEFAULT_SPREADSHEET_URL'))
  }
  return current;
}

function doGet() {
  const exported = export(getActiveSpreadsheet());
  return ContentService
    .createTextOutput(JSON.stringify(exported, 4, null))
    .setMimeType(ContentService.MimeType.JSON);
}

function onOpen() {
  const orgName = PropertiesService.getScriptProperties().getProperty('ORG_NAME');
  const menu = SpreadsheetApp.getUi().createMenu(orgName)
  if(getActiveSpreadsheet().getSheetByName('Accounts')) {
    menu.addItem('Snapshot All', 'snapshotAllTrigger')
  }
  if(getActiveSpreadsheet().getSheetByName('Timesheet')) {
    menu.addItem('Snapshot Timesheet', 'snapshotTrigger')
  }
  menu.addToUi();
}

function snapshotTrigger() {
  const spreadsheet = getActiveSpreadsheet();
  snapshot(spreadsheet);
}

function snapshotAllTrigger() {
  const spreadsheet = SpreadsheetApp.openByUrl(PropertiesService.getScriptProperties().getProperty('DEFAULT_ACCOUNTS_URL'));
  snapshotAll(spreadsheet);
}

// TODO: doesn't trigger?
/*
function onEdit(e) {
  Logger.log('onEdit called ' + JSON.stringify(e))
  change(e);
}
*/