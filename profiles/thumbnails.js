function makeRequest(url) {
  var presentationService = getPresentationService();
  var response = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: 'Bearer ' + presentationService.getAccessToken() 
    }
  });
  Logger.log(response.getContentText());
  const contentUrl = JSON.parse(response.getContentText()).contentUrl;
  return contentUrl;
}

function createThumbnail(presentation, slide) {
  var objectId = slide.getObjectId();
  Logger.log('Selection is a page with ID: ' + slide.getObjectId());
  var url = Utilities.formatString(
    "https://slides.googleapis.com/v1/presentations/%s/pages/%s/thumbnail", 
    presentation.getId(), objectId);
  Logger.log('Thumbnail URL ' + url);
  contentUrl = makeRequest(url);
  Logger.log(contentUrl);
  return contentUrl;
}

function createThumbnailsFolder(presentationFile, name) {
  const presentationFolder = presentationFile.getParents().next();
  const thumbnailsFolders = presentationFolder.getFoldersByName(name);
  var thumbnailsFolder;
  if(thumbnailsFolders.hasNext()) {
    Logger.log('Folder already exist, reusing');
    thumbnailsFolder = thumbnailsFolders.next();
  } else {
    Logger.log('Thumbnails folder does not exist in folder, creating in: ' + presentationFolder.getName());
    thumbnailsFolder = DriveApp.createFolder(name);
    presentationFolder.addFolder(thumbnailsFolder);
  }
  return thumbnailsFolder;
}

function allFiles(thumbnailsFolder) {
  const thumbnailsFolderFiles = thumbnailsFolder.getFiles();
  const existingFiles = {}
  while(thumbnailsFolderFiles.hasNext()) {
    var nextFile = thumbnailsFolderFiles.next();
    existingFiles[nextFile.getName()] = nextFile;
  }
  return existingFiles;
}