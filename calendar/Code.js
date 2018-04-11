//we want to use this script to build an object that we can then send to postgreSQL
function onChange(e) {
  Logger.log(e);
  const calendar = CalendarApp.getCalendarById(e.calendarId);
  //setting the constant calendar to be the calendar id from the event(the event comes from the calendar getting changed)
  const events = calendar.getEvents(new Date('2018-01-01'), new Date());
  //setting the contant events to be the events found on the calendar with the id that we set earlier from January 1st until today
  

  
  const data = events.map(function(e) {
    
  var calendarEventObject = {
      "date": e.getStartTime().getFullYear() + "-" + (e.getStartTime().getMonth()+1) + "-" + e.getStartTime().getDate(),
      "activity": e.getTitle(),
      "startTime": Utilities.formatDate(events[i].getStartTime(), "GMT-7", "MM-dd-yyyy HH:mm"),
      "stopTime": e.getEndTime(),
      "projectName": e.getOriginalCalendarId(),
      "taskName": e.getDescription()
  }
 
      return calendarEventObject;
  });
  //setting the constant data to be the result of mapping over array of calendar events. 
  Logger.log(data);
  
  //PropertiesService.getScriptProperties().setProperty('LAST_UPDATE', new Date())
}