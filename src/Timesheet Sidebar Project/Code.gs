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
  var sheet = SpreadsheetApp.openById('1fHShi7L1ZLxKPYojl7gjMxFjiL6L4txAeZ7akf9vzd0').getActiveSheet();
  jump();
  var duration = null;
  var total = null;
  var Avals = sheet.getRange("A1:A").getValues();
  var Alast = Avals.filter(String).length;
  var lastrow = sheet.getRange(Alast+1,1,1,9);
  var values = [[datas.enterDate, datas.enterStartTime, datas.enterEndTime, duration, total, datas.enterFullName, datas.enterCategory, datas.enterActivity, datas.enterLink]];
  lastrow.setValues(values);
  return 'success!';
}

function jump() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var values = sheet.getRange("A:A").getValues();
  var maxIndex = values.reduce(function(maxIndex, row, index) {
    return row[0] === "" ? maxIndex : index;
  }, 0);
  sheet.setActiveRange(sheet.getRange(maxIndex + 2, 1));
}
