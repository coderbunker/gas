function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    { name: 'Set up script...', functionName: 'onCreateScript' },
    { name: 'Create folder', functionName: 'createFolder' }, 
    { name: 'Send onboarding Email', functionName: 'sendEmail' }
  ];

  spreadsheet.addMenu('Coderbunker', menuItems);
}