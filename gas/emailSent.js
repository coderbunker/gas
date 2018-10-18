// This constant is written in column C for rows for which an email
// has been sent successfully.
var EMAIL_SENT = 'EMAIL_SENT';

/**
 * Sends non-duplicate emails with data from the current spreadsheet.
 */
function sendEmails2() {
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/11fWotgVODH5xuj6OH9YunbJCMnqCWD1Ud-pyJ_ID52A/edit?addon_dry_run=AAnXSK9w8NHAXYfaSQF_L-9LSeo0I0jxtMjWHsIErt0I7ZKreKiDbr2iHV8kWJVMcXSnkR2Pp8tzNqBdBEWuj-CdpQ0tEXoUJQd4A4yGA-J-GlUlDKVOyrXBLIl6FDa7xiF0qErwhuvG#gid=680313616").getSheetByName("Test");
  var startRow = 2; // First row of data to process
  var numRows = 2; // Number of rows to process
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, 3);
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var emailAddress = row[0]; // First column
    var message = row[2]; // Second column
    var emailSent = row[1]; // Third column
    if (emailSent != EMAIL_SENT) { // Prevents sending duplicates
      var subject = 'Sending emails from a Spreadsheet';
      MailApp.sendEmail(emailAddress, subject, message);
      sheet.getRange(startRow + i, 3).setValue(EMAIL_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }
  }
}