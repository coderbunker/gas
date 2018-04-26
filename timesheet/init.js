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
    menu.addItem('Snapshot Accounts & All Timesheets', 'snapshotAllTrigger');
  }
  if(getActiveSpreadsheet().getSheetByName('Timesheet')) {
    menu.addItem('Snapshot Timesheet', 'snapshotTrigger');
  }
  menu.addToUi();
}

function snapshotTrigger() {
  const spreadsheet = getActiveSpreadsheet();
  snapshot(spreadsheet, ['Timesheet', 'Balance'], 'Timesheet');
}

function snapshotAllTrigger() {
  const spreadsheet = SpreadsheetApp.openByUrl(PropertiesService.getScriptProperties().getProperty('DEFAULT_ACCOUNTS_URL'));
  snapshotAll(spreadsheet);
  snapshot(spreadsheet, ['Accounts'], 'Leads & Opportunities')
}