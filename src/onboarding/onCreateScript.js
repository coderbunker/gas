/*
 * Manually run the onCreateScript() function first after deployment, ONLY ONCE
 * to initiate properties, triggers, and others that are needed during running
 */

var PROPERTIES_TYPE_SCRIPT = 1;
var PROPERTIES_TYPE_USER = 2;
var PROPERTIES_TYPE_DOCUMENT = 3;

function onCreateScript() {
    createTrigger();

    setProperty('PROFILE_IMAGE_FILE_ID', '1KvZudA9OtE-PRPyY7kP567kjhWGJqUop', PROPERTIES_TYPE_SCRIPT);
    setProperty('ADD_DRIVE_IMAGE_ID', '1Mh_uizD2jeJ72tIdQiD4Y8nzwi-CsozD', PROPERTIES_TYPE_SCRIPT);
}

/* 
 * create a trigger that whenever a user form a data, it triggers onboarding function
 */
function createTrigger() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
    ScriptApp.newTrigger('onboarding')
      .forSpreadsheet(spreadsheet)
      .onFormSubmit()
      .create();
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
            // TODO: log errors
            break;
    } 
}