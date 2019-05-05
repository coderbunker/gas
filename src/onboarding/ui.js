// Use this code for Google Docs, Slides, Forms, or Sheets.
function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
  .createMenu('Coderbunker')
  .addItem('Send email', 'sendEmail')
  .addItem('Create Folder', 'createFolder')
      .addToUi();
}