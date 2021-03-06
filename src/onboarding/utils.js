function addNewRecord(name, email) {
  var resultSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Emails");
  if (searchRow(email, resultSheet)) {  // if there's already have a record of that person
    return false;
  }
  resultSheet.insertRowBefore(2);
  var newUserRowRange = resultSheet.getRange("A2:B2");
  newUserRowRange.setValues([ [name, email] ]);
  return true;
}

function searchRow(keyword, sheet) {
  var textFinder = sheet.createTextFinder(keyword);
  var firstOccurRange = textFinder.findNext();
  var rowIndex = null;
  if (firstOccurRange) {
    rowIndex = firstOccurRange.getRowIndex();
  }
  return rowIndex;
}

function setProperty(propertyName, propertyValue, type) {
    switch (type) {
        case PROPERTIES_TYPE_SCRIPT: 
            PropertiesService.getScriptProperties().setProperty(propertyName, propertyValue);
            break;
        case PROPERTIES_TYPE_USER:
            PropertiesService.getUserProperties().setProperty(propertyName, propertyValue);
            break;
        case PROPERTIES_TYPE_DOCUMENT: 
            PropertiesService.getDocumentProperties().setProperty(propertyName, propertyValue);
            break;
        default:
            console.error();
            break;
    } 
}

function getProperty(propertyName, type) {
  switch (type) {
    case PROPERTIES_TYPE_SCRIPT: 
      return PropertiesService.getScriptProperties().getProperty(propertyName);
    case PROPERTIES_TYPE_USER:
      return PropertiesService.getUserProperties().getProperty(propertyName);
    case PROPERTIES_TYPE_DOCUMENT: 
      return PropertiesService.getDocumentProperties().getProperty(propertyName);
    default:
      console.error();
      break;
  }
}

function deleteAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    console.log(triggers[i])
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

function selectedTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  console.log(triggers);
}