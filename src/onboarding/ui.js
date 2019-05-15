function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    { name: 'Set up script (ONLY ONCE)', functionName: 'onCreateScript' },
    { name: 'Send onboarding Email', functionName: 'sendEmail2FailedOnes' },
    { name: 'Create folder', functionName: 'createFolder2FailedOnes' }, 
    { name: 'Send onboarding Email to ...', functionName: 'sendEmail' },
    { name: 'Create folder for ...', functionName: 'createFolder' }
  ];

  spreadsheet.addMenu('Coderbunker', menuItems);
}