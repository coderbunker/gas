function onboarding(e) {
  // filtering out unwanted trigger activation. 
  // https://stackoverflow.com/questions/54834837/how-can-i-be-getting-multiple-unwanted-event-blocks-from-the-same-onformsubmit-t/54860085#54860085
  if (e.values && !e.values[1]) {
    return;
  }
  
  var submitUser = {
      name: e.namedValues['Full name'],
      email: e.namedValues['Email Address'],
  };
  
  addNewRecord(submitUser.name, submitUser.email);
  add2CommunityGroup(submitUser.email);
  sendEmail(submitUser.name, submitUser.email);
  createFolder(submitUser.name, submitUser.email);

  // log to Stackdriver logging system
  console.log('[Onboarding - Add from Form] name: ' + submitUser.name + ' ; email: ' + submitUser.email);  
}
