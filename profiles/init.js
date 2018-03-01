/**
 * @OnlyCurrentDoc
 */

// if you have multiple users account, watch out for the generated URL as it contains a reference to user /u/1
// that you need to remove
// https://stackoverflow.com/questions/47045209/google-drive-page-not-found-sorry-unable-to-open-the-file-at-this-time
function doGet(e) {
  const members = convertSlidesFromPresentation(SlidesApp.openById(getTestPresentationId()));
  return ContentService.createTextOutput(JSON.stringify(members, null, 4))
    .setMimeType(ContentService.MimeType.JSON);
}

function onOpen() {
  const orgName = PropertiesService.getScriptProperties().getProperty('ORG_NAME');
  SlidesApp.getUi()
      .createMenu(orgName)
      .addItem('Authorize', 'showSidebar')
      .addItem('Logout', 'clearService')
      .addItem('Convert slides', 'convertSlides')
      .addItem('Show thumbnails', 'showThumbnailsSidebar')
      .addItem('Snapshot', 'snapshot')
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
  const members = convertSlidesFromPresentation(SlidesApp.openById(getTestPresentationId()));
  const sortedMembers = members.sort(function(m1, m2) {
    return m1.fullname.localeCompare(m2.fullname);
  });
  const page = render(sortedMembers);
  SlidesApp.getUi().showSidebar(page);
}

function snapshot() {
  const exported = export(SlidesApp.getActivePresentation())
  const endpoint = PropertiesService.getScriptProperties().getProperty('SNAPSHOT_ENDPOINT');
  postData(SlidesApp.getActivePresentation().getId(), exported, endpoint);
}