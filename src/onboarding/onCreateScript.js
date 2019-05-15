/*
 * Manually run the onCreateScript() function first after deployment, ONLY ONCE
 * to initiate properties, triggers, and others that are needed during running
 */

var PROPERTIES_TYPE_SCRIPT = 1;
var PROPERTIES_TYPE_USER = 2;
var PROPERTIES_TYPE_DOCUMENT = 3;

var PROFILE_IMAGE_FILE_ID = "1KvZudA9OtE-PRPyY7kP567kjhWGJqUop";
var ADD_DRIVE_IMAGE_ID = "1Mh_uizD2jeJ72tIdQiD4Y8nzwi-CsozD";
var PERSONAL_PARENT_FOLDER_ID = "0B-PYJiOSewXLUE1obURNLURxX1k";
var PERSONAL_PLAN_TEMPLATE_DOC_ID = "1CWqLtG9G7GgfMzSP110LSRmaBnZlMtX0D3kNOuPZr6g";

function onCreateScript() {
  createTrigger();
  
  setProperty("PROFILE_IMAGE_FILE_ID", PROFILE_IMAGE_FILE_ID, PROPERTIES_TYPE_SCRIPT);
  setProperty("ADD_DRIVE_IMAGE_ID", ADD_DRIVE_IMAGE_ID, PROPERTIES_TYPE_SCRIPT);
  setProperty("PERSONAL_PARENT_FOLDER_ID", PERSONAL_PARENT_FOLDER_ID, PROPERTIES_TYPE_SCRIPT);
  setProperty("PERSONAL_PLAN_TEMPLATE_DOC_ID", PERSONAL_PLAN_TEMPLATE_DOC_ID, PROPERTIES_TYPE_SCRIPT);
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
