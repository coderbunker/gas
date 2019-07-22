var onGoingClientsIds = onGoingCLients().map(function (group) {
  return group.groupId
});
function listAllGroups() {
  var pageToken;
  var page;
  var onGoingGroups=[] ;
  do {
    page = AdminDirectory.Groups.list({
      domain: 'coderbunker.com',
      maxResults: 150,
      pageToken: pageToken
    });
    var groups = page.groups;
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        if (onGoingClientsIds !== undefined && onGoingClientsIds.indexOf(groups[i].id) !== -1) {
          onGoingGroups.push(groups[i])
        }
        ;
        // Logger.log('%s (%s)', group.name, group.email)
      }
    }
    // else {
    //   Logger.log('No groups found.')
    // }
    pageToken = page.nextPageToken;
  } while (pageToken)
  //Logger.log(onGoingGroups);
  return onGoingGroups;
}