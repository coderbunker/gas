function onInstall() {
  onOpen();
}

function onOpen() {
  var ui = SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      ui.createMenu('Timesheet')
      .addItem('Update Project Time', 'showProject')
      .addToUi();
}

function doPost(e) {
  Logger.log(e); 
}

function showProject() {
  var html = HtmlService.createHtmlOutputFromFile('updateProject')
      .setTitle('Update Timesheet')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(html);
}

function sendText(data1) {
var sheet = SpreadsheetApp.openById('1x2xl82HuI5j8w1XYfmrjLOvsucFEIvnjCl8KFu2nkuk').getActiveSheet();
sheet.appendRow([data1.enterFullName]);
  return 'success!';
}
