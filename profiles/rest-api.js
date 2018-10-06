// if you have multiple users account, watch out for the generated URL as it contains a reference to user /u/1
// that you need to remove
// https://stackoverflow.com/questions/47045209/google-drive-page-not-found-sorry-unable-to-open-the-file-at-this-time
function doGet(e) {
  const members = convertSlidesFromPresentation(SlidesApp.openById(getTestPresentationId()));
  return ContentService.createTextOutput(JSON.stringify(members, null, 4))
    .setMimeType(ContentService.MimeType.JSON);
}