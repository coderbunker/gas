function testAddNewRow() {
  var testUserName = "Test User - Andie";
  var testUserEmail = "angdichu@gmail.com";
  addNewRecord(testUserName, testUserEmail);
}

function testSearchRow() {
  var keyword = "Test User - Andie";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Emails");
  Logger.log(searchRow(keyword, sheet));
}

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

function testOnboarding() {
  // mimic event data
  var namedValues = {};
  namedValues["Full name"] = "Test User - Andie";
  namedValues["Email Address"] = "angdichu@gmail.com";
  var event = { namedValues: namedValues };

  onboarding(event);
}