function snapshotAllCalendarOfSpreadsheetTrigger() {
  snapshotAllCalendarOfSpreadsheet(getActiveSpreadsheet());
}

function snapshotAllCalendarOfSpreadsheet(spreadsheet) {
  const sheet = spreadsheet.getSheetByName('Balance');
  if(!sheet) {
    Logger.log('no balance sheet in spreadsheet ' + spreadsheet.getName());
    return;
  }
  const mapping = getHeaderMapping(sheet);
  const accounts = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getDisplayValues();
  const entries = convertToEntries(accounts, mapping);
  const responses = entries.map(function(entry) { 
    Logger.log(entry.resource);
    Logger.log(entry.fullname);
    if(!entry.calendarid) {
      Logger.log('No calendar associated to %s', entry.resource);
      return null;
    }
    const calendar = CalendarApp.getCalendarById(entry.calendarid);
    if(!calendar) {
      Logger.log('not a valid calendar id: %s', entry.calendarid);
      return null;
    }
    return snapshotCalendar(calendar);
  });
  Logger.log(responses);
}

function snapshotCalendar(calendar) {
  const exportData = exportCalendar(calendar);
  const snapshotEndpoint = PropertiesService.getScriptProperties().getProperty('SNAPSHOT_ENDPOINT');
  exportData['category'] = 'Timesheet';
  const result = postData(calendar.getId(), exportData, snapshotEndpoint);
  Logger.log(result);
  return result;
}

function exportCalendar(calendar) {
  const id = calendar.getId();
  const name = calendar.getName();
  const timezone = calendar.getTimeZone();
  
  const obj = {
    id: id,
    name: name,
    timezone: timezone,
    apptype: 'Calendar',
  };
 
  const events = calendar.getEvents(new Date('2018-01-01'), new Date());
  const eventsArray = events.map(function(e) {
    return {
      name: e.getTitle(),
      startTime: e.getStartTime(),
      endTime: e.getEndTime(),
      creators: e.getCreators()
    }
  });
  
  obj['events'] = eventsArray;

  return obj;
}