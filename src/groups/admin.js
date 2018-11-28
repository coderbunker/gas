/**
 * Lists all the groups in the domain.
 */
function listAllGroups() {
  var pageToken;
  var page;
  var groupList = [];
  
  do {
    page = AdminDirectory.Groups.list({
      domain: 'coderbunker.com',
      maxResults: 500,
      pageToken: pageToken,
    });
    var groups = page.groups;
    if (groups) {
      groupList = groupList.concat(groups);
      /*for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        Logger.log('%s (%s)', group.name, group.email);
      }*/
    } else {
      Logger.log('No groups found.');
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
  return groupList;
}

/**
 * Lists all members of the group.
 */
function listAdminGroupMembers(groupKey) {
  Logger.log(groupKey);
  var memberList = [];
  var response = AdminDirectory.Members.list(groupKey);
  users = memberList.concat(response.members);
  while (response.nextPageToken){
    response = AdminDirectory.Members.list(groupKey,{pageToken: response.nextPageToken});
    memberList = memberList.concat(response.members);
  }
  var usersHash = {}
  users.forEach(function(user) {
    return usersHash[user.email] = user;
  });
  return usersHash;
}

function testListAllGroups() {
  const groups = listAllGroups();
  Logger.log(JSON.stringify(groups));
  var groupsData = {}
  groups.forEach(function(g) {
    groupsData[g] = {};
    groupsData[g].members = listAdminGroupMembers(g.email);
    groupsData[g].email = g.email;
    groupsData[g].id = g.id;
  });
  Logger.log(JSON.stringify(groupsData));
}