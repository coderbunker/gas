function onboarding(e) {
  var submitUser = {
      name: e.namedValues['Full name'],
      email: e.namedValues['Email Address'],
  };
  
  addNewRecord(submitUser.name, submitUser.email);
  sendEmail(submitUser.name, submitUser.email);
  createFolder(submitUser.name, submitUser.email);

  // log
  logInfo2StackdriverLogging('[Onboarding - Add from Form] name: ' + submitUser.name + ' ; email: ' + submitUser.email);  
}
