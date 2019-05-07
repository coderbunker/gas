// Use this code for Google Docs, Slides, Forms, or Sheets.
function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
  .createMenu('Agora Space')
  .addItem('Add event to Calendar', 'addEvent')
      .addToUi();
}