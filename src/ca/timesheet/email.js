function sendErrorEmail(err) {
  var userEmail = Session.getActiveUser().getEmail();
  var containerSS = SpreadsheetApp.getActiveSpreadsheet();
  
  GmailApp.sendEmail(
    userEmail, 
    'Script Error: ' + containerSS.getName(), 
    'There\'s an error in the current running Google App Script: \n\n' + err.message, 
    {
    attachments: [ containerSS ],
    name: 'No-reply Script Runner'
    }
  );
}
