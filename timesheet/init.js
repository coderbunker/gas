function doGet() {
  const exported = export(SpreadsheetApp.getActiveSpreadsheet());
  return ContentService
    .createTextOutput(JSON.stringify(exported, 4, null))
    .setMimeType(ContentService.MimeType.JSON);
}

function onEdit(e) {
  Logger.log('onEdit called ' + JSON.stringify(e))
  change(e);
}

function onOpen() {
  const orgName = PropertiesService.getScriptProperties().getProperty('ORG_NAME');
  SpreadsheetApp.getUi()
      .createMenu(orgName)
      .addItem('Snapshot', 'snapshot')
      .addToUi();
}