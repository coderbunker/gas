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

function createThumbnail(presentationId, slideObjectId) {
  Logger.log('Selection is a page with ID: ' + slideObjectId);
  var url = Utilities.formatString(
    "https://slides.googleapis.com/v1/presentations/%s/pages/%s/thumbnail", 
    presentationId, slideObjectId);
 
  Logger.log('Thumbnail URL ' + url);
  contentUrl = makeRequest(url);
  Logger.log(contentUrl);
  return contentUrl;
}

function createThumbnailsFolder(presentationFolder, name) {
  const folders = presentationFolder.getFoldersByName(name);
  var thumbnailsFolder;
  if(folders.hasNext()) {
    Logger.log('Folder already exist, reusing');
    thumbnailsFolder = folders.next();
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
    var filename = nextFile.getName();
    if(existingFiles[filename]) {
      Logger.log('We already have such a file - deleting duplicate: ' + filename);
      DriveApp.removeFile(nextFile);
    } else {
      existingFiles[filename] = nextFile;
    }
  }
  return existingFiles;
}

function test_allFiles() {
  const folder = DriveApp.getFolderById('0B6ENhgMQsLriM2N4TVJRS3Z1Sm8');
  const files = allFiles(folder);
  Logger.log(JSON.stringify(files));
                     
}