// fetch all slides in the slidedeck
// extract identity -> listOfEmails
//
// retrieve list from mailing lists
// interns, members -> associates, partners, freelancers, colearners
//
// add additional labels: founder to rngadam@gmail.com

function memoize(fnc, key, clear) {
  Logger.log(fnc.name + '->' + key);
  var value = CacheService.getScriptCache().get(key);
  if(!value || clear) {
    value = fnc(key);
    CacheService.getScriptCache().put(key, JSON.stringify(value));
  } else {
    value = JSON.parse(value);
  }
  return value;
}

function importGroupMembers() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Members');
  const emails = listGroupMembers();
  emails.forEach(function(e) {
    sheet.appendRow(['','member', e])
  });
}

function getPeopleData() {
  var data = CacheService.getScriptCache().get('CACHED_PEOPLE_REST_API');
  if(!data) {
    data = UrlFetchApp.fetch(PropertiesService.getScriptProperties().getProperty('PEOPLE_REST_API'));
    CacheService.getScriptCache().put('CACHED_PEOPLE_REST_API', data)
  } 
  return data;
}

function testGetPeopleData() {
  CacheService.getScriptCache().remove('CACHED_PEOPLE_REST_API');
  Logger.log(getPeopleData());
}

function importGroups() {
  const groups = ['interns', 'members', 'freelancers'];
  const groupsToEmails = {};
  groups.forEach(function(g) {
    groupsToEmails[g] = memoize(listAdminGroupMembers, g);
  });
  return groupsToEmails;
}

function testImportGroups() {
    Logger.log(JSON.stringify(importGroups(), null, 4));
}

