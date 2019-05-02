
function getJsonDocAsText() {
  const membersDocId = getJsonDocId();
  return DriveApp.getFileById(membersDocId).getAs('text/json').getDataAsString();
}

function getJsonDocId() {
  //const members = convertSlidesFromPresentation(SlidesApp.openById(getTestPresentationId()));
  const presentation = SlidesApp.getActivePresentation();
  const documentProperties = PropertiesService.getDocumentProperties();
  
  var membersDocId = documentProperties.getProperty('MEMBERS_DOCUMENT_ID');  
  const previousLastUpdatedTime = getLastUpdatedOfDocId(membersDocId);
  const slidesLastUpdated = getLastUpdatedOfDocId(presentation.getId());

  if(slidesLastUpdated > previousLastUpdatedTime) {
    console.log('Members document needs update');
    // swap old doc id to new one
    membersDocId = createNewUpdateMembersJsonDoc(membersDocId, presentation);
    documentProperties.setProperty('MEMBERS_DOCUMENT_ID', membersDocId);
  } 
  return membersDocId;
}


function createNewUpdateMembersJsonDoc(membersDocId, presentation) {
  // extract members information
  const members = convertSlidesFromPresentation(presentation); 
  
  // store it in a new file
  const storageFolder = getDriveStorageFolder();
  const membersFile = DriveApp.createFile(
    'members.json', 
    JSON.stringify(members, null, 4), 
    'text/json'
  );
  storageFolder.addFile(membersFile);

  // trash the old document
  trashFileById(storageFolder, membersDocId);
  
  // return new file id
  return membersFile.getId();
}