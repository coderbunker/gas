function getPresentationLastUpdated(presentation) {
  const presentationFile = DriveApp.getFileById(presentation.getId());
  return presentationFile.getLastUpdated();
}

function getPresentationFolder(presentation) {
  const presentationFile = DriveApp.getFileById(presentation.getId());
  return presentationFile.getParents().next();
}

function getTargetFolderName() {
  return PropertiesService.getScriptProperties().getProperty('TARGET_FOLDER_NAME');
}

function getDriveStorageFolder() {
  const presentationFolder = getPresentationFolder(SlidesApp.getActivePresentation());
  const thumbnailsFolder = createThumbnailsFolder(presentationFolder, getTargetFolderName());
  
  return thumbnailsFolder;
}

function getCreatedDateTime(docid) {
  return DriveApp.getFileById(docid).getDateCreated();
};

function trashFile(folder, file) {
  folder.removeFile(file)
  DriveApp.removeFile(file);
  file.setTrashed(true);
}

function trashFileById(folder, fileId) {
  const file = DriveApp.getFileById(fileId);
  trashFile(folder, file);
}

function getUrl(fileId) {
  return DriveApp.getFileById(fileId).getUrl();
}

function getLastUpdatedOfDocId(docid) {
  if(!docid) {
    return 0;
  }
  try {
    return DriveApp.getFileById(docid).getLastUpdated();
  } catch(e) {
    return 0;
  }
};