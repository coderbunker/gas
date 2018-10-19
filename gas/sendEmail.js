// Use this code for Google Docs, Slides, Forms, or Sheets.
function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Coderbunker')
      .addItem('Send email', 'sendEmail')
      .addToUi();
}

function sendEmail() {
  var file = DriveApp.getFileById('1WKqYD9GLqmLjDqJyeY4BPkvl31vgRAeM');
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Emails");
  var startRow = 2; // First row of data to process
  var numRows = sheet.getLastRow(); // Number of rows to process 
  // Fetch the range of cells (row, column, numRows, numColumns--this check column 3 is it is duplicate)
  var dataRange = sheet.getRange(startRow, 1, numRows - 1, 3);
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var name = row[0]; // First column
    var email = row[1]; // Second column
    var isBlank = sheet.getRange(startRow + i, 3, 1, 1).isBlank();
    if (isBlank) { // Prevents sending duplicates
      var html = HtmlService.createHtmlOutputFromFile('emailTemplate').getContent();
      var subject = name + "'s " + "Coderbunker Onboarding";
  
      GmailApp.sendEmail(email, subject, "", 
                     {
                       "from":"services@coderbunker.com", "name": "Coderbunker Services", 
                       "cc":"bizdev@coderbunker.com",
                       htmlBody: html, 
                       inlineImages: {imageKey: file.getAs(MimeType.PNG)},
                      });
      sheet.getRange(startRow + i, 3).setValue(new Date());
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();

    }
  }
}