function getPresentationLastUpdated(presentation) {
  const presentationFile = DriveApp.getFileById(presentation.getId());
  return presentationFile.getLastUpdated();
}

function getPresentationFolder(presentation) {
  const presentationFile = DriveApp.getFileById(presentation.getId());
  return presentationFile.getParents().next();
}

function getDriveStorageFolder() {
  const presentationFolder = getPresentationFolder(SlidesApp.getActivePresentation());
  const thumbnailsFolder = createThumbnailsFolder(presentationFolder, getTargetFolderName());
  
  return thumbnailsFolder;
}


function getLastUpdatedTime(docid) {
  return DriveApp.getFileById(docid).getLastUpdated();
};

function getCreatedDateTime(docid) {
  return DriveApp.getFileById(docid).getDateCreated();
};