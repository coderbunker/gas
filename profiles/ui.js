/**
 * @OnlyCurrentDoc
 */

function onOpen() {
  const orgName = PropertiesService.getScriptProperties().getProperty('ORG_NAME');
  SlidesApp.getUi()
      .createMenu(orgName)
      .addItem('Authorize', 'showSidebar')
      .addItem('Logout', 'clearService')
      .addItem('Convert slides', 'convertSlides')
      .addItem('Show thumbnails', 'showThumbnailsSidebar')
      .addItem('Snapshot', 'snapshot')
      .addItem('Convert to spreadsheet', 'convertToSpreadsheet')
      .addToUi();
}

function clearService(){
  OAuth2.createService('presentation2')
      .setPropertyStore(PropertiesService.getUserProperties())
      .reset();
}

function getTargetFolderName() {
  return PropertiesService.getScriptProperties().getProperty('TARGET_FOLDER_NAME');
}

function showThumbnailsSidebar() {
  const presentation = SlidesApp.getActivePresentation();
  const members = convertSlidesFromPresentation(presentation);
  const sortedMembers = members.sort(function(m1, m2) {
    return m1.fullname.localeCompare(m2.fullname);
  });
  const page = render(sortedMembers);
  SlidesApp.getUi().showSidebar(page);
}

function convertSlides() {
  const presentation = SlidesApp.getActivePresentation();
  const members = convertSlidesFromPresentation(presentation);
  const page = render(members);

  SlidesApp.getUi().showSidebar(page);
}

function convertToSpreadsheet() {
  const presentation = SlidesApp.getActivePresentation();
  const members = convertSlidesFromPresentation(presentation);
  console.log(members);
  const spreadsheetUrl = exportToSpreadsheet(members);
  console.log(spreadsheetUrl);
}

function getLastUpdateTimestamp() {
  //const members = convertSlidesFromPresentation(SlidesApp.openById(getTestPresentationId()));
  const updated = DriveApp.getFileById(getTestPresentationId());
  DriveApp.
  Logger.log(updated);
}