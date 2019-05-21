function testAddNewRow() {
  var testUserName = "Test User - Andie";
  var testUserEmail = "angdichu@gmail.com";
  addNewRecord(testUserName, testUserEmail);
}

function testSearchRow() {
  var keyword = "angdichu@gmail.com";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Emails");
  Logger.log(searchRow(keyword, sheet));
}

function testSearchFolder() {
  var parentFolder = DriveApp.getFolderById("0B-PYJiOSewXLUE1obURNLURxX1k");
  var subFolders = parentFolder.getFolders();
  var folderExists = false;
    
  var folders = parentFolder.searchFolders('title = "Angdi Chu"');
  if (!folders.hasNext()) {
    Logger.log("No folder named: Angdi Chu");
  }
  while (folders.hasNext()) {
    Logger.log(folders.next().getName());
  }
}

function testGetProperty() {
  Logger.log(getProperty("LOG_SPREADSHEET_ID", PROPERTIES_TYPE_SCRIPT));
  Logger.log(getProperty("PROFILE_IMAGE_FILE_ID", PROPERTIES_TYPE_SCRIPT));
  Logger.log(getProperty("ADD_DRIVE_IMAGE_ID", PROPERTIES_TYPE_SCRIPT));
  Logger.log(getProperty("PERSONAL_PARENT_FOLDER_ID", PROPERTIES_TYPE_SCRIPT));
  Logger.log(getProperty("PERSONAL_PLAN_TEMPLATE_DOC_ID", PROPERTIES_TYPE_SCRIPT));
}

function testSendEmail() {
    var testUserName = "Andie Testing Again";
    var testUserEmail = "angdichu@gmail.com";

    sendEmail(testUserName, testUserEmail);
}

function testCreateFolder() {
  var testUserName = "Andie Testing Again";
  var testUserEmail = "angdichu@gmail.com";
  
  createFolder(testUserName, testUserEmail);
}

function testEmailAlias() {
  var me = Session.getActiveUser().getEmail();
  var aliases = GmailApp.getAliases();
  Logger.log(aliases);
  Logger.log(me)
}

function testShowErrorDialog() {
  var title = "Test Error";
  var errMsg = "This is a error message.Oh yes!";
  showErrorDialog(title, errMsg);
}

function testLog2File() {
  var title = "Test Error";
  var errMsg = "This is a error message.Oh yes!";
  log2File(errMsg, title, "ERROR");
}

function testOnboarding() {
  // mimic event data
  var namedValues = {};
  namedValues["Full name"] = "Andie Testing Again";
  namedValues["Email Address"] = "angdichu@gmail.com";
  var event = { namedValues: namedValues };

  onboarding(event);
}

function testAdminDirectoryAPI() {
  var pageToken;
  var page;
  do {
    page = AdminDirectory.Groups.list({
      domain: DOMAIN,
      maxResults: 100,
      pageToken: pageToken
    });
    var groups = page.groups;
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        Logger.log('%s (%s)', group.name, group.email);
      }
    } else {
      Logger.log('No groups found.');
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
}

function testAddMember2Group() {
  var member = "angdichu@gmail.com";
  var group = "internaldev.test";
  var groupEmail = group + "@" + DOMAIN;
  
  var memberResrc = addMember2Group(member, groupEmail, GROUP_ROLE_MEMBER);
  
  Logger.log(memberResrc);
}

function testAdd2CommunityGroup() {
  var user = "angdichu@gmail.com";
  add2CommunityGroup(user);
}