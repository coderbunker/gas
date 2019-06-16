function sendEmail(){
  var dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("coderbunker join in button");
  
  for (var i = 2; i <= dataSheet.getLastRow(); i++){
    var name = dataSheet.getRange(i, 1).getValue();
    var emailAddress = dataSheet.getRange(i, 2).getValue();
    var status = dataSheet.getRange(i, 5).getValue();
    
    
    if (status == '') {  // if there is no sending record
    // sending onboarding email
    var htmlTemplate = HtmlService.createTemplateFromFile("EmailTemplate");
    htmlTemplate.name = name;
    var htmlContent = htmlTemplate.evaluate().getContent();
    var subject = "Welcome " + name + "!";
      
    GmailApp.sendEmail(
      emailAddress, 
      subject, 
      "",
     {
        from: "services@coderbunker.com",
        name: "Welcome", 
        cc: "am.freelancer@coderbunker.com",
        htmlBody: htmlContent
      }
    );
    
    // save the email sending result
    dataSheet.getRange(i, 5).setValue(new Date());
  }
  }
}
