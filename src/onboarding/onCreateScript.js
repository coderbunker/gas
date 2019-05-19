/*
 * Manually run the onCreateScript() function first after deployment, ONLY ONCE
 * to initiate properties, triggers, and others that are needed during running
 */

function onCreateScript() {
  createTrigger();
  
  setProperty("PROFILE_IMAGE_FILE_ID", PROFILE_IMAGE_FILE_ID, PROPERTIES_TYPE_SCRIPT);
  setProperty("ADD_DRIVE_IMAGE_ID", ADD_DRIVE_IMAGE_ID, PROPERTIES_TYPE_SCRIPT);
  setProperty("PERSONAL_PARENT_FOLDER_ID", PERSONAL_PARENT_FOLDER_ID, PROPERTIES_TYPE_SCRIPT);
  setProperty("PERSONAL_PLAN_TEMPLATE_DOC_ID", PERSONAL_PLAN_TEMPLATE_DOC_ID, PROPERTIES_TYPE_SCRIPT);
  setProperty("LOG_SPREADSHEET_ID", LOG_SPREADSHEET_ID, PROPERTIES_TYPE_SCRIPT);
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
