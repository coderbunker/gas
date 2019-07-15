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
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp
      .showSidebar(html);
}

// send user input to Google Spreadsheet
function sendAll(datas) {
  var success = false;
  var sheet = SpreadsheetApp.openById('1fHShi7L1ZLxKPYojl7gjMxFjiL6L4txAeZ7akf9vzd0').getActiveSheet(); // ID for Timesheet
  var logSheet = SpreadsheetApp.openById('1fHShi7L1ZLxKPYojl7gjMxFjiL6L4txAeZ7akf9vzd0').getSheetByName("Log");
  var duration = null;
  var total = null;
  jump();
  var Avals = sheet.getRange("A1:A").getValues();
  var Alast = Avals.filter(String).length;
  var lastrow = sheet.getRange(Alast+1, 1, 1, 9);
  var values = [[datas.enterDate, datas.enterStartTime, datas.enterEndTime, duration, total, datas.enterFullName, datas.enterCategory, datas.enterActivity, datas.enterLink]];
  lastrow.setValues(values);
  var timezone = "GMT+" + new Date().getTimezoneOffset()/60;
  var date = Utilities.formatDate(new Date(), timezone, "yyyy-MM-dd HH:mm"); 
  logSheet.appendRow([date, "Data entered by " + datas.enterFullName]);
  return success = true;
}

// jump to input line
function jump() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var values = sheet.getRange("A:A").getValues();
  var maxIndex = values.reduce(function(maxIndex, row, index) {
    return row[0] === "" ? maxIndex : index;
  }, 0);
  sheet.setActiveRange(sheet.getRange(maxIndex + 2, 1));
}

// still working; extract full name from members.json with active user email address
function matchName () {
  var emailaddress = Session.getActiveUser().getEmail();
  Logger.log(emailaddress);
  var member = DriveApp.getFileById('1SpjwxFatmPH_bax7riTjBd1SF7g4Z8Lg'); //members.json copy file for testing
  for(var i = 0; i < member.length; i++) {
    if((member[i].members.email == emailaddress) || (member[i].members.altemails == emailaddress)) {
      return member[i].members.fullname;
    }
    else {
      return null;
    }
  }
}

// still working; jump to user's last entry
function jumpToRecent (fullName, date) {
  var sheet = SpreadsheetApp.openById('1fHShi7L1ZLxKPYojl7gjMxFjiL6L4txAeZ7akf9vzd0').getActiveSheet(); // ID for Timesheet
  for (var i = sheet.getMaxRows(); i>0; i--) {
    if ((sheet.getRange(i,1) === date) && (sheet.getRange(i,6) === fullName)){
      sheet.setActiveRange(sheet.getRange(i,1));
    }
   }
   jump();
}
