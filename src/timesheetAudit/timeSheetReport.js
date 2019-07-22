function timeSheetReport(clientName){
  var clientGroup = listAllGroups().filter(
      function (client) {
        return client.id === clientName.groupId;
      }
  )
  var data = timesheetBasicInfo(clientName).data;
  var header = timesheetBasicInfo(clientName).header;
  // GET THE CURRENT CLIENT GOOGLE GROUP 
  var clientGoogleGroup = clientMailNGoogleGroup(clientName);
  //var clientAuditsheet = SpreadsheetApp.openByUrl(clientName.auditLink).getSheetByName('Timesheet memebers')

  /* TIME SHEET AUDIT AND REPORT BEGIN */
// ITERATE ALL THE ROW TO PICK APPROVED FREELANCERS AND UNKNOWN FREELANCER AND INCORRECT INFO IN THE JSON FILE
  var statuses = {};
  for(var row in data){
    if (row >= 1){
      var thisRow = data[row];
      // BASIC INFORMATIONS ROW TO BE VERYFIED
      var name = thisRow[header.indexOf('Full name')];
      var validity = thisRow[header.indexOf('Validity date')] ;
      var rate = thisRow[header.indexOf('Rate')];
      //FREELANCER INFO IN THE JSON FILE 
      var freelancer = FreelancersInfo(name)
      statuses[name]= freelancerStatus(freelancer, clientGoogleGroup, validity, rate)
    }
  };
  //EMAILS TO SEND WHEN THE AFTER TIMESHEET AUDIT.
  //EMAIL SENT TO REPORT UNKNOWN USER IN THE JSON FILE
  //'am.client@coderbunker.com'
  var statusesKeys = Object.keys(statuses);
  var UnknownUser = statusesKeys.filter(function(key){ return statuses[key] === 'UnknownUser'});
  var shouldNotBeInGoogleGroup = statusesKeys.filter(function(key){ return statuses[key] === 'shouldNotBeInGoogleGroup'});
  var shouldBeInGoogleGroup = statusesKeys.filter(function(key){ return statuses[key] ==='shouldBeInGoogleGroup'});
  var membersJsonfileLink = DriveApp.getFileById('1YgThK0YM8d_RiEc-IBPBBft0vMEeGQGg').getUrl()
  if ( UnknownUser.length >= 1){
    GmailApp.sendEmail(['mohamed.semega@coderbunker.com'],
        'member.json file, information report',
        'TEST EMAIL'+
        '\nHello, '+
        '\n I would like to report, the following User: \n'+
        UnknownUser
        +
        '\n Please, follow these recommendations, to solve the issue: '+
        '\n 1. Go to: '+clientName.timeSheetLink +
        '\n 2. Search the names mentioned above,'+
        '\n 3. Update the name to be an exact copy of the name(s) here: '+membersJsonfileLink+
        '\n Kind regards,'
    )
  }
  if(shouldNotBeInGoogleGroup.length >= 1){
    GmailApp.sendEmail(['mohamed.semega@coderbunker.com'],
        clientName.clientName+' google group to be updated',
        'TEST EMAIL'+
        '\nHello,'+
        '\n I would like to report , the following members : \n'
        + '\n 1. Go to the client google group: '+clientName.timeSheetLink+
        '\n 2. delete the emails of the names, mentioned here from the google group.'+
        shouldNotBeInGoogleGroup
        +'>>\nKind regards,'
    )
  }
  if(shouldBeInGoogleGroup.length >= 1){
    GmailApp.sendEmail(['mohamed.semega@coderbunker.com'],
        clientName.clientName+' google member update',
        'TEST EMAIL\nHello, \n'+
        'I would like to report that the following person(s) \n '+
        shouldBeInGoogleGroup+
        '\n Please, follow these recommendations, to solve the issue: '+
        '\n 1. Go to the client google group: '+clientName.clientName+
        '\n 2. Add the email above in the google group; Or update the emails to the profil of the right person members.json object'+
        '\n 3. Save the changes'+
        '\n 4. The issue, will be solved after completion of the steps.'+
        '\nKind regards,')
  }
}

// FUCNTION TO TAKE OF THE TIMESHEET OF THE CLIENT
function timesheetBasicInfo(theClient){
  // BASIC INFORMAITONS OF THE CLIENT SHEET
  var spreadsheetLink = theClient.timeSheetLink;
  var sheetName = 'Team';
  var currentTeamTimeSheet = SpreadsheetApp.openByUrl(spreadsheetLink).getSheetByName(sheetName);
  var sheetFirstRow = 1;
  var sheetLastRow = currentTeamTimeSheet.getLastRow()-1;
  var sheetFirstColumn = 1;
  var sheetLastColumn = currentTeamTimeSheet.getLastColumn() -1;
  // THE SHEET DATA RANGE TO PROCESS
  var data = currentTeamTimeSheet.getRange(sheetFirstRow, sheetFirstColumn, sheetLastRow, sheetLastColumn).getValues();
  var headerRow = data[0];
  return {
    sheetLink :spreadsheetLink,
    sheetName :sheetName,
    teamTimeSheet :currentTeamTimeSheet,
    header :headerRow,
    data :data,
  }
}

// FUNCTION TO PROCESS THE MAIL AND GOOGLE GROUP OF THE CLIENT
function clientMailNGoogleGroup(theClient){
  //ALL Groups
  var allGroups = AdminDirectory.Groups.list({domain:"coderbunker.com"}).groups;
  var clientEmail = allGroups.filter(function(e){
    if(theClient.groupId.trim() === e.id){
      return e
    }
  })[0]["email"];
  // client google group
  return GroupsApp.getGroupByEmail(clientEmail);
}
// check the altemails in the client group
function altEmailCheck(altemail, group){
  var inGroup = false
  var arrayOfAltEmails = altemail.trim().split(',');
  for (var x in arrayOfAltEmails){
    if(group.hasUser(arrayOfAltEmails[x])){
      return inGroup = true
    }
  }
  return  inGroup
};

function freelancerStatus(freelancer,  group, validity, rate){
  // CHECK ALL THE MEMBER VALIDITY AND EMAIL IN THE MEMBER.JSON FILE
  if (freelancer !== undefined && freelancer.hasOwnProperty('email')){
    var mailcheck = group.hasUser(freelancer.email);
    var userInTheGroup = mailcheck ?
        mailcheck : (
            (freelancer.hasOwnProperty('altemails') )?
                //CALLING THE ALEMAIL FUNCTION TO CHECK THE ALTEMAIL IN THE CLIENT GROUP
                altEmailCheck(freelancer.altemails, group=group) :
                false
        );
    // CHECK IF THE FREELANCER HAS INVALID DATA AND IN THE GOOGLE GROUP
    if(validity === '' || rate <=0 && userInTheGroup ){
      return 'shouldNotBeInGoogleGroup'
    }
    if (validity !== '' && rate > 0 && !userInTheGroup){
      return 'shouldBeInGoogleGroup'
    }else{
      return 'UserInTheGroup'
    }
  }
  /*else if ( !freelancer.hasOwnProperty('email') || (freelancer.altemails !== undefined && !freelancer.hasOwnProperty('altemails'))){
    return 'UnknownUserEmail'
  }*/
  else{
    return 'UnknownUser'
  }
}
/* TIMESHEET AUDIT AND REPORT END */

/* GOOGLE GROUP AUDIT AND REPORT BEGIN */
function googleGroupReport(clientName){
  const clientGoogleGroupUsers = clientMailNGoogleGroup(clientName).getUsers();
  const freelancerTimeSheetNames = timesheetBasicInfo(clientName).data.map(
      function(e){
        return e[0].toLowerCase()
      }
  );
  //RETRIEVE USERS INFO USING THE GROUP EMAILS
  var usersJsonInfo =clientGoogleGroupUsers.map(
      function (userEmail) {
        return FreelancersInfo(userEmail) !==  (undefined || null) ? FreelancersInfo(userEmail) : {
          "userEmail" : userEmail,
          "jsonStatus": FreelancersInfo(userEmail)
        }
      }
  );
  // ALL THE USERS NAMES AVAILABLE WITH VALID INFO
  var allValidUsers = usersJsonInfo.filter(
      function(object){
        if (object !== undefined && (!(object.hasOwnProperty("jsonStatus")) || !(object.hasOwnProperty("userEmail")))){
          return object
        }
      }
  );
  
  //ALL THE VALID USERS NOT IN THE TIMESHEET
  var userNotInTheTimesheet = allValidUsers.filter(
    function(element){
      return freelancerTimeSheetNames.indexOf(element.fullname.toLowerCase().trim()) === -1;
    }
  );
  // ALL USERS WITH INVALID INFO
  var usersWithInvalidInfo = usersJsonInfo.filter(
      function(element){
        if ( element !== undefined && (element.hasOwnProperty("userEmail") && element.hasOwnProperty("jsonStatus"))){
          return element
        }
      }
  );

  if ( userNotInTheTimesheet.length >= 1){
    var UserNotInSheetNames = userNotInTheTimesheet.map(function (e){ return e.fullname, e.email})
    GmailApp.sendEmail(['mohamed.semega@coderbunker.com'],
        clientName.clientName+'Timesheet Report',
        'TEST EMAIL'+
        '\nHello, '+
                       '\n I would like to report, the following: \n"'+UserNotInSheetNames+
        '\n Please, follow these recommendations, to solve the issue: '+
        '\n 1. Go to: '+clientName.timeSheetLink+
        '\n 2. Add the name(s) mentioned here to the timesheet'+
        '\n 3. The name must be an exact copy of the one in the members.json file.'+
        '\n Kind regards,')
  }
}
/* GOOGLE GROUP AUDIT AND REPORT END */