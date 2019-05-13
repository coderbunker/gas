function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    { name: 'Create folder', functionName: 'createFolder' }, 
    { name: 'Send onboarding Email', functionName: 'sendEmail' }
  ];

  spreadsheet.addMenu('Coderbunker', menuItems);
}