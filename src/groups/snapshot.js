function snapshot(endpoint, timezone, cb) {
  const groups = listAllGroups();
  groups.forEach(function(g) {
    var doc = {
      members: listAdminGroupMembers(g.email),
      name: g.name,
      email: g.email,
      id: g.id,
      apptype: 'Groups',
      category: 'Membership',
      timezone: timezone
    };
    const output = postData(g.id, doc, endpoint);
    Logger.log(output);
    cb(doc, output);
  });
}