/*
 * Manually run the onCreateScript() function first after deployment, ONLY ONCE
 * to initiate properties, triggers, and others that are needed during running
 */

function onCreateScript() {
  createTrigger();
  
  setProperty("PROFILE_IMAGE_FILE_ID", PROFILE_IMAGE_FILE_ID, PROPERTIES_TYPE_SCRIPT);
  setProperty("ADD_DRIVE_IMAGE_ID", ADD_DRIVE_IMAGE_ID, PROPERTIES_TYPE_SCRIPT);
  setProperty("PERSONAL_PARENT_FOLDER_ID", PERSONAL_PARENT_FOLDER_ID, PROPERTIES_TYPE_SCRIPT);
  //setProperty("PERSONAL_PLAN_TEMPLATE_DOC_ID", PERSONAL_PLAN_TEMPLATE_DOC_ID, PROPERTIES_TYPE_SCRIPT);
  setProperty("COMMUNITY_INTRODUCTION_DOC_ID", COMMUNITY_INTRODUCTION_DOC_ID, PROPERTIES_TYPE_SCRIPT);
  setProperty("LOG_SPREADSHEET_ID", LOG_SPREADSHEET_ID, PROPERTIES_TYPE_SCRIPT);
  setProperty("GROUP_MEMBER", GROUP_MEMBER, PROPERTIES_TYPE_SCRIPT);
}

/* 
 * create a trigger that whenever a user form a data, it triggers onboarding function
 */
function createTrigger() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  var user = Session.getActiveUser();
  var userEmail = user.getEmail();
  
  if (userEmail == "angdi.chu@coderbunker.com") {
    ScriptApp.newTrigger("onboarding")
      .forSpreadsheet(spreadsheet)
      .onFormSubmit()
      .create();
  } else {
    console.error("You don't have permission to create an onboarding trigger! Please contact with Andie (angdi.chu@coderbunker.com). ", new Error());
  }
  
}
