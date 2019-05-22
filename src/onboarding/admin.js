function add2CommunityGroup(user) {
  var resultSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Emails");
  var userRowIndex = searchRow(user, resultSheet);
  var newUserRowRange = resultSheet.getRange(userRowIndex, 5); // get the "Groups added" cell
  
  if (!newUserRowRange.getValue()) {  // if there is no group added record
    var group = getProperty("GROUP_MEMBER", PROPERTIES_TYPE_SCRIPT);
    var groupEmail = group + "@" + DOMAIN;
    
    var member = addMember2Group(user, groupEmail, GROUP_ROLE_MEMBER);
    
    if (member) {
      newUserRowRange.setValue(new Date());
    }
  }
}

function add2CommunityGroup2FailedOnes() {
  // TODO: finish this!
  var group = getProperty("GROUP_MEMBER", PROPERTIES_TYPE_SCRIPT);
  var groupEmail = group + "@" + DOMAIN;
  
  var resultSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Emails");
  var totalRange = resultSheet.getDataRange();
  var lastRowId = totalRange.getLastRow();
  var range = resultSheet.getRange(2, 1, lastRowId-1, 5);
  
  var dataArr = range.getValues();
  Logger.log(dataArr.length);
  for (var i = 0; i < dataArr.length; i++) {
    var row = dataArr[i];
    if(!row[4]) {    // Group added column is empty
      var user = row[1];
      var member = addMember2Group(user, groupEmail, GROUP_ROLE_MEMBER);
      
      if (member) {
        resultSheet.getRange(i+2, 5).setValue(new Date());
      }
    }
  }
}

function addMember2Group(user, group, role) {
  var member = {
    email: user,
    role: role
  };
  
  try {
    member = AdminDirectory.Members.insert(member, group);
    
    console.log('Add Member "' + user + '"' + ' to Group "' + group +'" as a ' + role, member);
    
    return member;
  } catch (err) {
    var errTitle = 'Add Member "' + user + '"' + ' to Group "' + group +'" as a ' + role + 'failed';
    log2File(err, errTitle, LOG_LEVEL_ERROR);
    console.error(errTitle, err);
  }
  
  return null;
}