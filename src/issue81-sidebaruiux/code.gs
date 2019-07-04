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

function sendAll(datas) {
  var sheet = SpreadsheetApp.openById('1dRAXZRHMgfR_oX1ZF1RFeonUi7ZPk_wbRf7Jx0UvCjE').getActiveSheet();
  var duration = null;
  var total = null;
  sheet.appendRow([ datas.enterDate, datas.enterStartTime, datas.enterEndTime, duration, total, datas.enterFullName, datas.enterCategory, datas.enterActivity, datas.enterLink]);
  return 'success!';
}
