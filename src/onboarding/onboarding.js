function onboarding(e) {
  var submitUser = {
      name: e.namedValues['Full name'],
      email: e.namedValues['Email Address'],
  };
  addNewRecord(submitUser.name, submitUser.email);
  sendEmail(submitUser.name, submitUser.email);
  // createFolderNew(submitUser.name);
  
  // log
  logInfo2StackdriverLogging('[Onboarding - Form] name: ' + submitUser.name + ' ; email: ' + submitUser.email);
  
  

  /*
  createFolder();
  sendEmail();
  
  myFunction();
  */
}
