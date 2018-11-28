// registered in Edit > Current project trigger > From Calendar | Event Updated
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

//https://developers.google.com/apps-script/guides/triggers/events
//To synchronize with Calendar in Apps Script, perform the following steps:
//Enable the Calendar advanced service for the script project. The built-in Calendar service isn't sufficent for this workflow.
//Determine what calendars should be synchronized. For each such calendar, perform an intitial sync operation using the Calendar advanced service's Events.list() method.
//The result of the initial sync returns a nextSyncToken for that calendar. Store this token for later use.
//When the Apps Script EventUpdated trigger fires indicating a calendar event change, perform an incremental sync for the affected calendar using the stored nextSyncToken. This is essentially another Events.list() request, but providing the nextSyncToken limits the response to only events that have changed since the last sync.
//Examine the response of the sync to learn what events were updated and have your code respond appropriately. For example, you can log the change, update a spreadsheet, send email notices, or take other actions.
//Update the nextSyncToken you stored for that calendar with the one returned by the incremental sync request. This forces the next sync operation to only return the most current changes.
