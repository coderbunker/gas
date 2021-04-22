var cbCAFolderId;

function init() {
  var scriptProps = PropertiesService.getScriptProperties();
  scriptProps.setProperty('CODERBUNKER_CANADA_FOLDER_ID', '1-3yjiDmGXxS7COk2iAUpIWKnL6vK9S6v');
}


function extractByCal(freelancer, tsName, startDate, endDate) {
  // var tsName = 'Timetracker';
  // var tsName = 'Coderbunker Canada';
  // var startDate = '2020-01-01';
  // var endDate = '2020-01-16';
    
  var cal = getCalByName(tsName);
  if (!!cal) {
    var works = getAllWorkingHoursOld(cal, setDate(startDate), setDate(endDate));
    export(works, freelancer, setDate(startDate));
  }
}

function extract(startDate, endDate) {
  
}

function generate() {
  // extract('2020-01-16', '2020-02-01');
  // extractByCal('Andie Chu', 'Timetracker', '2020-01-01', '2020-01-16');
  
  // extractByCal('Ricky Ng-Adam', 'Coderbunker Canada', '2020-03-16', '2020-04-01');
  
  extractByProj('E-Smart', '2020-10-16', '2020-11-01');
}

function extractByProj(calName, startDate, endDate) {
  var cal = searchCal(calName);
  if (!!cal) {
    var hoursArr = getAllWorkingHours(cal, setDate(startDate), setDate(endDate));
    exportToProj(calName, hoursArr, setDate(startDate));
  }
}
