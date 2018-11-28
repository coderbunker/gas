function onOpen() {
  const orgName = PropertiesService.getScriptProperties().getProperty('ORG_NAME') || 'Coderbunker';
  const menu = SpreadsheetApp.getUi().createMenu(orgName)
  menu.addItem('Update all index', 'updateIndexAll');
  menu.addItem('Update current row', 'updateCurrentRow');
  menu.addToUi();
}
