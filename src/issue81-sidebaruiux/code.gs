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

// function sendAll(datas) {
//  var sheet = SpreadsheetApp.openById('1dRAXZRHMgfR_oX1ZF1RFeonUi7ZPk_wbRf7Jx0UvCjE').getActiveSheet();
//  for (var i = 0; i < sheet.getMaxRows()+1; i++ ){
//    if (sheet.getRange(i,4).getValue() === "0:00:00") {
//      sheet.getRange(i,1).setValue(datas.enterDate);
//      sheet.getRange(i,2).setValue(datas.enterStartTime);
//      sheet.getRange(i,3).setValue(datas.enterEndTime);
//      sheet.getRange(i,6).setValue(datas.enterFullName);
//      sheet.getRange(i,7).setValue(datas.enterCategory);
//      sheet.getRange(i,8).setValue(datas.enterActivity);
//      sheet.getRange(i,9).setValue(datas.enterLink);
//      break;
//    }
//  }
//  return 'success!';
//}
