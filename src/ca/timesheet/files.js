function findTimesheetFile(prjName, folder) {
  var files = DriveApp.searchFiles('title contains "timesheet" and "' + folder.getId() + '" in parents');
  var timesheet = null;
  
  var timesheetFile = null;
  
  if (files.hasNext()) {
    timesheetFile = files.next();
  } else {
    // timesheetFile = createSpreadsheet()  // NO LONGER SUPPORT CREATING GOOGLE DOC
  }
  
  return timesheetFile;
}

function export(works, freelancer, startDate) {
  var cbCAFolderId = getScriptPropertyByName('CODERBUNKER_CANADA_FOLDER_ID');
  
  var projects = Object.keys(works);
  for (var i = 0; i < projects.length; i++) {
    var prjName = projects[i];
    
    var queryStr;
    if (prjName.toLowerCase() !== 'coderbunker') {
      queryStr = 'title contains "' + prjName + '" and "' + cbCAFolderId + '" in parents';
    } else {
      queryStr = 'title contains "' + prjName + '" and title contains "administration" and "' + cbCAFolderId + '" in parents';
    }
    
    var folders = DriveApp.searchFolders(queryStr);
    
    while (folders.hasNext()) {
      var folder = folders.next();
      Logger.log(folder.getName());
      var file = findTimesheetFile(prjName, folder);
      
      if (file) {
        exportHoursToSpreadsheet(works[prjName], file, freelancer, startDate);
      } else {
        sendErrorEmail(new Error('No timesheet file is found in the current project folder!'));
      }
      
      break;  // only create the timesheet file in one folder
    } 
  }
}

function exportToProj(prjName, hours, startDate) {
  var cbCAFolderId = getScriptPropertyByName('CODERBUNKER_CANADA_FOLDER_ID');

  var queryStr;
  if (prjName.toLowerCase() !== 'coderbunker') {
    queryStr = 'title contains "' + prjName + '" and "' + cbCAFolderId + '" in parents';
  } else {
    queryStr = 'title contains "' + prjName + '" and title contains "administration" and "' + cbCAFolderId + '" in parents';
  }
  
  var folders = DriveApp.searchFolders(queryStr);
  
  while (folders.hasNext()) {
    var folder = folders.next();
    Logger.log(folder.getName());
    var file = findTimesheetFile(prjName, folder);
    
    if (file) {
      for (var i = 0; i < hours.length; i++) {
        var event = hours[i];
        
        var freelancer = event.creator.name;
        exportHourToSpreadsheet(event, file, freelancer, startDate);
      }
      
      // exportHoursToSpreadsheet(hours, file, freelancer, startDate);
    } else {
      sendErrorEmail(new Error('No timesheet file is found in the current project folder!'));
    }
    
    break;  // only create the timesheet file in one folder
  }
  
}

function exportHourToSpreadsheet(event, file, freelancer, startDate) {
  var timesheet = SpreadsheetApp.open(file);
  
  // 1. choose or create the right SHEET
  var sheet;
  var timeStr = startDate.getYear() + '-' + get2DigitNum(startDate.getMonth() + 1) + '-' + get2DigitNum(startDate.getDate());
  var sheetName = freelancer + ' (' + timeStr + ')';
  if (sheet = searchSheet(sheetName, timesheet)) {
  } else {
    sheet = createSheet(timesheet, freelancer, startDate);
  }
  
  // 2. insert date into the timesheet
  // Logger.log(event.startTime + ' * ' + event.endTime + ' * ' + event.desc + ' * ' + freelancer);
  insertHourInSheet(event, sheet);
}

function exportHoursToSpreadsheet(hours, file, freelancer, startDate) {
  var timesheet = SpreadsheetApp.open(file);
  
  // 1. copy the timesheet sheet to the project timesheet files
  var newSheet = createSheet(timesheet, freelancer, startDate);
  
  // 2. insert the data into the timesheet
  insertHoursInSheet(hours, newSheet);
  
  // 3. export an pdf
  // TODO
    
}

function createSheet(spreadsheet, freelancer, startDate) {
  var sheetTemplate = getSheetTemplate();
  
  // var newSheet = spreadsheet.insertSheet({ template: sheetTemplate });
  var newSheet = sheetTemplate.copyTo(spreadsheet);
 
  var timeStr = startDate.getYear() + '-' + get2DigitNum(startDate.getMonth() + 1) + '-' + get2DigitNum(startDate.getDate());
  newSheet.setName(freelancer + ' (' + timeStr + ')');
  
  return newSheet;
}

function searchSheet(text, spreadsheet) {
  var sheets = spreadsheet.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    if (sheet.getName().indexOf(text) > -1) {
      return sheet;
    }
  }
  return null;
}

function getSheetTemplate() {
  var thisSS = SpreadsheetApp.getActiveSpreadsheet();
  return thisSS.getSheetByName('Timesheet');
}

function insertHourInSheet(event, sheet) {
  var dateCellColId = findCellPosByKeyword('date', sheet).colId;
  var startTimeCellColId = findCellPosByKeyword('Start time', sheet).colId;
  var endTimeCellColId = findCellPosByKeyword('End time', sheet).colId;
  var descCellColId = findCellPosByKeyword('Description', sheet).colId;
  var durationCellColId = findCellPosByKeyword('Duration', sheet).colId;
  
  var insertRowId = findLastRow(sheet);
  
  var startTime = event['startTime'];
  var endTime = event['endTime'];
  var desc = event['desc'];
  
  sheet.getRange(insertRowId, dateCellColId).setValue(startTime);
  sheet.getRange(insertRowId, startTimeCellColId).setValue(startTime);
  sheet.getRange(insertRowId, endTimeCellColId).setValue(endTime);
  sheet.getRange(insertRowId, descCellColId).setValue(desc);
  
  sheet.getRange(insertRowId, durationCellColId).setFormula('=D' + insertRowId + '-C' + insertRowId);
}

function insertHoursInSheet(events, sheet) {
  var dateCellColId = findCellPosByKeyword('date', sheet).colId;
  var startTimeCellColId = findCellPosByKeyword('Start time', sheet).colId;
  var endTimeCellColId = findCellPosByKeyword('End time', sheet).colId;
  var descCellColId = findCellPosByKeyword('Description', sheet).colId;
  
  var durationCellColId = findCellPosByKeyword('Duration', sheet).colId;
  
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var startTime = event['startTime'];
    var endTime = event['endTime'];
    var desc = event['desc'];
    
    var insertRowId = findLastRow(sheet);
    sheet.getRange(insertRowId, dateCellColId).setValue(startTime);
    sheet.getRange(insertRowId, startTimeCellColId).setValue(startTime);
    sheet.getRange(insertRowId, endTimeCellColId).setValue(endTime);
    sheet.getRange(insertRowId, descCellColId).setValue(desc);
    
    sheet.getRange(insertRowId, durationCellColId).setFormula('=D' + insertRowId + '-C' + insertRowId);
  }

}

function getVillagerNameByEmail(email) {
  var villagerSH = SpreadsheetApp.openById(getScriptPropertyByName('VILLAGER_SPREADSHEET_FILE_ID'));
  
  var textFinder = villagerSH.createTextFinder(email);
  var firstResult = textFinder.findNext();
  
  if (!!firstResult) {
    var rowId = firstResult.getRowIndex();
    
    return villagerSH.getRange('A' + rowId).getValue();
  }
}
