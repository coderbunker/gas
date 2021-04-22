function getCalByName(name) {
  var cal = CalendarApp.getDefaultCalendar();
  var cals = CalendarApp.getAllCalendars();
    
  for (var i = 0; i < cals.length; i++) {
    if (cals[i].getName() == name) {
      return cals[i];
    }
  }
}

function searchCal(text) {
  var cals = CalendarApp.getAllCalendars();
  for (var i = 0; i < cals.length; i++) {
    // Logger.log(cals[i].getName());
    if (cals[i].getName() && cals[i].getName().indexOf(text) > -1) {
      return cals[i];
    }
  }
}

function getAllWorkingHours(calendar, startTime, endTime) {
  var events = calendar.getEvents(startTime, endTime);
  var hoursArr = [];
  for (var i = 0; i < events.length; i++) {
    var e = events[i];
    
    var eTitle = e.getTitle();
    var eStartTime = e.getStartTime();
    var eEndTime = e.getEndTime();
    var eCreators = e.getCreators();
    
    var eCreatorName = getVillagerNameByEmail(eCreators[0]);
    
    // Logger.log(eTitle + ' * ' + eCreatorName);
    
    var eventObj = {};
    eventObj.startTime = eStartTime;
    eventObj.endTime = eEndTime;
    eventObj.desc = eTitle;
    eventObj.creator = { name: eCreatorName, email: eCreators[0]};
    
    hoursArr.push(eventObj);
  }
  
  //Logger.log(hoursArr);
  return hoursArr;
}

function getAllWorkingHoursOld(calendar, startTime, endTime) {
  var events = calendar.getEvents(startTime, endTime);
  var works = {};
  
  for (var i = 0; i < events.length; i++) {
    var e = events[i];
    
    var eTitle = e.getTitle();
    var eStartTime = e.getStartTime();
    var eEndTime = e.getEndTime();
    
    var splitRe = /\:/;
    if (!eTitle.match(splitRe)) {
      continue;
    }
    var strs = eTitle.split(splitRe);
    var prjName = strs[0].trim();
    var workDesc = strs[1].trim();
    // Logger.log(prjName + ' - ' + workDesc);
    
    var prjArr = works[prjName];
    
    if (!prjArr) {
      prjArr = [];
      works[prjName] = prjArr;
    }
    var eventObj = {};
    eventObj.startTime = eStartTime;
    eventObj.endTime = eEndTime;
    eventObj.desc = workDesc;
    prjArr.push(eventObj);
  }
    
  Logger.log(works);
  
  return works;
}

function getWorkingHoursByProject(calendar, startTime, endTime, prjName) {
  var events = calendar.getEvents(startTime, endTime, {search: prjName});
  
  // TODO
}

