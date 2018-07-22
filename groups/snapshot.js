function export(doc) {
  const payload = {
    id:id, 
    name: name, 
    data: data,
    apptype: 'Groups',
    category: 'Membership'
  };
  return payload;
}

function snapshot() {
  const endpoint = PropertiesService.getScriptProperties().getProperty('SNAPSHOT_ENDPOINT');
  const groups = listAllGroups();
  groups.forEach(function(g) {
    var doc = {
      members: listAdminGroupMembers(g.email),
      name: g.name,
      email: g.email,
      id: g.id,
      apptype: 'Groups',
      category: 'Membership'
    };
    const output = postData(g.id, doc, endpoint);
    Logger.log(output);
  });
}