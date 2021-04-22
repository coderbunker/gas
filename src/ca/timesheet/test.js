function testCreateSheet() {
  var thisSS = SpreadsheetApp.getActiveSpreadsheet();
  var date = new Date('2020-03-01T00:00:00');
  createSheet(thisSS, 'Andie Chu', date);
}

function testDateString() {
  var date = new Date('2020-01-01T00:00:00');
  Logger.log(date);
  Logger.log('Hello ABC' + ' (' + date.getYear() + '-' + get2DigitNum(date.getMonth() + 1) + '-' + get2DigitNum(date.getDate()) + ')');
}

function testSetDate() {
  var date = new Date('2020-01-13T09:11:58');
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  
  var dateCell = sheet.getRange(2, 1);
  var startTimeCell = sheet.getRange(2, 3);
  
  dateCell.setValue(date);
  startTimeCell.setValue(date);
  
}

function testFindLastRow() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  Logger.log(findLastRow(sheet));
}

function testFindCellPosByKeyword() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var kw = 'Start time';
  
  Logger.log(findCellPosByKeyword(kw, sheet));
}


function testInsertHoursInSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var events = [
    {
      startTime: new Date('2020-01-03T10:15'),
      endTime: new Date('2020-01-03T12:30'),
      desc: 'a test log here 01'
    },
    {
      startTime: new Date('2020-01-03T14:30'),
      endTime: new Date('2020-01-03T18:00'),
      desc: 'fsadfsafdas dafds 23432v dss'
    },
    {
      startTime: new Date('2020-01-07T11:00'),
      endTime: new Date('2020-01-07T17:45'),
      desc: ' sdfsdfsd sfds3223 321 '
    },
  ];

  insertHoursInSheet(events, sheet);
}

function testSendErrorEmail() {
  var err = new Error('You just got FUCKED!!!');
  sendErrorEmail(err);
}