function onboarding(e) {
  var submitUser = {
      name: e.namedValues['Full name'],
      email: e.namedValues['Email Address'],
  };
  
  // test
  logInfo2StackdriverLogging('a new record is here! name: ' + submitUser.name + ' ; email: ' + submitUser.email);
  
  sendEmail(submitUser.name, submitUser.email);

  /*
  createFolder();
  sendEmail();
  
  myFunction();
  */
}