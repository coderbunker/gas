function transfer() {
  const calendars = CalendarApp.getCalendarsByName('Coderbunker Internal Projects Timesheet')
  const calendar = calendars[0];
  const exportData = export(calendar);
  const snapshotEndpoint = PropertiesService.getScriptProperties().getProperty('SNAPSHOT_ENDPOINT');
  exportData['category'] = 'Timesheet';
  const result = postData(calendar.getId(), exportData, snapshotEndpoint);
  Logger.log(result);
}

function postData(id, doc, endpoint) {
  const options = {
    method : 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      id: id,
      doc: doc
    })
  };
  return UrlFetchApp.fetch(endpoint, options);
}

function export(calendar) {
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
