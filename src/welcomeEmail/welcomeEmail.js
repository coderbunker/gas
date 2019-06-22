function sendEmail(){
    var dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("coderbunker join in button");
      
      for (var i = 2; i <= dataSheet.getLastRow(); i++){
        var name = dataSheet.getRange(i, 1).getValue();
        var emailAddress = dataSheet.getRange(i, 2).getValue();
        var status = dataSheet.getRange(i, 5).getValue();
       if (status == ''){ // if it is a new entry, the status is empty.
         
        for (var j = 1; j < i; j++){         
          
            
            if (emailAddress == dataSheet.getRange(j, 2).getValue()){ // if there is a duplication. 
              // send email that already registered, without cc
              var duplicateRegistration = HtmlService.createTemplateFromFile("duplicateRegistration");
              duplicateRegistration.name = name;
              var subjectDuplication = "Hello " + name + "!";
              var htmlContentDuplicate = duplicateRegistration.evaluate().getContent();
              
              GmailApp.sendEmail(
                emailAddress, 
                subjectDuplication, 
                "",
                {
                  from: "services@coderbunker.com",
                  name: "CoderBunker", 
                  htmlBody: htmlContentDuplicate
                }
              );
              dataSheet.getRange(i, 5).setValue("Duplication");
              break;
            }
            
            else if (j == i - 1){ //go through all the previous record, and no duplication, send welcome email and cc. 
            var htmlTemplate = HtmlService.createTemplateFromFile("EmailTemplate");
            htmlTemplate.name = name;
            var subject = "Welcome " + name + "!";
            var htmlContent = htmlTemplate.evaluate().getContent();
          
            GmailApp.sendEmail(
                emailAddress, 
                subject, 
                "",
                {
                from: "services@coderbunker.com",
                name: "CoderBunker", 
                cc: "am.freelancer@coderbunker.com",
                htmlBody: htmlContent
                }
            );
            dataSheet.getRange(i, 5).setValue(new Date());
            } 
        } 
    } 
  } 
}            
    