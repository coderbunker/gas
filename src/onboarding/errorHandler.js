function handleError(title, err) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Emails");
  // TODO: finish
  console.error(title, err);
  showErrorDialog(title, err);
}

function log2File(err, title, level) {
  var logFileId = getProperty("LOG_SPREADSHEET_ID", PROPERTIES_TYPE_SCRIPT);
  var logSpreadsheet = SpreadsheetApp.openById(logFileId);
  var sheet = logSpreadsheet.getSheetByName("Logs");
  
  var allRange = sheet.getDataRange();
  var logRowId = allRange.getLastRow() + 1;
  
  var timeCell = sheet.getRange(logRowId, 1);
  var titleCell = sheet.getRange(logRowId, 2);
  var typeCell = sheet.getRange(logRowId, 3);
  var detailCell = sheet.getRange(logRowId, 4);
  
  timeCell.setValue(new Date());
  titleCell.setValue(title);
  typeCell.setValue(level);
  detailCell.setValue(err.message);  
}

function sendErrorEmail(err, title) {
  var recieverEmail = Session.getActiveUser().getEmail();
  var emailSubject = "Error Occured: " + title;
  var htmlTemplate = HtmlService.createTemplateFromFile('errorEmailTemplate');
  htmlTemplate.scriptName = "Onboarding";
  htmlTemplate.err = err;
  var htmlContent = htmlTemplate.evaluate().getContent();

  GmailApp.sendEmail(
    recieverEmail, 
    emailSubject, 
    "",  // leave the body of the email blank, because we are gonna use html templates (htmlBody)
    {
      from: "services@coderbunker.com", 
      name: "Coderbunker Services",
      htmlBody: htmlContent
    }
  );
}