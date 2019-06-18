function onChange() {
    //trigger .onChange()
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger("sendEmail")
      .forSpreadsheet(sheet)
      .onChange()
      .create();
  
}
