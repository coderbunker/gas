function onOpen() {
  const orgName = PropertiesService.getScriptProperties().getProperty('ORG_NAME');
  SlidesApp.getUi()
      .createMenu(orgName)
      .addItem('Snapshot Groups', 'snapshot')
      .addToUi();
}

function snapshot() {
  const groups = importGroups();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Snapshot');
  sheet.clear();
  var emailsWithLabels = {};
  Object.keys(groups).forEach(function(g) {
    Object.keys(groups[g]).forEach(function(email) {
      if(!emailsWithLabels[email]) {
        emailsWithLabels[email] = [email];
      }
      emailsWithLabels[email].push(g);
    });
  });
  insertIntoSpreadsheet(sheet, emailsWithLabels);
}