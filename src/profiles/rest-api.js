// if you have multiple users account, watch out for the generated URL as it contains a reference to user /u/1
// that you need to remove
// https://stackoverflow.com/questions/47045209/google-drive-page-not-found-sorry-unable-to-open-the-file-at-this-time
function doGet(e) {
  //const members = convertSlidesFromPresentation(SlidesApp.openById(getTestPresentationId()));
  const presentation = SlidesApp.getActivePresentation();
  const lastUpdatedTime = getLastUpdatedTime(presentation.getId());
  const documentProperties = PropertiesService.getDocumentProperties();
  const previousLastUpdatedTimeString = documentProperties.getProperty('MEMBERS_DOCUMENT_LAST_UPDATED_TIME')
  const previousLastUpdatedTime = new Date(previousLastUpdatedTimeString);
  var membersDocumentId = documentProperties.getProperty('MEMBERS_DOCUMENT_ID');
  var json;
  
  if(!previousLastUpdatedTime || lastUpdatedTime > previousLastUpdatedTime || !membersDocumentId) {
    console.log('Members document needs update');
    var members = convertSlidesFromPresentation(presentation);
    json = JSON.stringify(members, null, 4); 
    var storageFolder = getDriveStorageFolder();
    var membersFile = DriveApp.createFile(
      'members.json', 
      json, 
      'text/json'
    );
    storageFolder.addFile(membersFile);

    membersDocumentId = membersFile.getId();

    documentProperties.setProperty('MEMBERS_DOCUMENT_ID', membersDocumentId);
    documentProperties.setProperty('MEMBERS_DOCUMENT_LAST_UPDATED_TIME', new Date());
  } else {
    console.log('using cache ' + membersDocumentId);
    json = DriveApp.getFileById(membersDocumentId).getAs('text/json').getDataAsString();
  }
  
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}