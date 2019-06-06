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
 
      var LogoUrl = "http://secure.meetupstatic.com/photos/event/d/3/6/f/600_451134127.jpeg";
      var LogoBlob = UrlFetchApp
                      .fetch(LogoUrl)
                      .getBlob()
                      .setName("LogoBlob");
      
   
      
    GmailApp.sendEmail(
      emailAddress, 
      subject, 
      "",
     {
        from: "services@coderbunker.com",
        name: "Welcome", 
        //cc: "bizdev@coderbunker.com",
        htmlBody: htmlContent,
        inlineImages:
    {
      Logo: LogoBlob,
      
    }
      }
    );
    
    // save the email sending result
    dataSheet.getRange(i, 5).setValue(new Date());
  }
  }
}
