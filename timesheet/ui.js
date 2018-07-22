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
  const exported = export(getActiveSpreadsheet(), ['Timesheet', 'Balance'], 'Timesheet');
  return ContentService
    .createTextOutput(JSON.stringify(exported, 4, null))
    .setMimeType(ContentService.MimeType.JSON);
}

function onOpen() {
  const orgName = PropertiesService.getScriptProperties().getProperty('ORG_NAME');
  const menu = SpreadsheetApp.getUi().createMenu(orgName)
  const spreadsheet = getActiveSpreadsheet();
  if(spreadsheet.getSheetByName('Accounts')) {
    menu.addItem('Snapshot Accounts & All Timesheets', 'snapshotAllTrigger');
  }
  if(spreadsheet.getSheetByName('Timesheet')) {
    menu.addItem('Snapshot Timesheet and associated calendars', 'snapshotTrigger');
  }
  if(spreadsheet.getSheetByName('Accounts Receivable Transactions')) {
    menu.addItem('Snapshot WaveApp', 'snapshotWaveApp');
  }
  menu.addToUi();
}

function snapshotWaveApp() {
  const spreadsheet = getActiveSpreadsheet();
  snapshot(spreadsheet, ['Accounts Receivable Transactions'], 'WaveApp');
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