function testSendEmail() {
    var testUserName = "Test User - Andie";
    var testUserEmail = "angdichu@gmail.com";

    sendEmail(testUserName, testUserEmail);
}

function testEmailAlias() {
  var me = Session.getActiveUser().getEmail();
  var aliases = GmailApp.getAliases();
  Logger.log(aliases);
  Logger.log(me)
}