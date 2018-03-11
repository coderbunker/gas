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

function convertSlides() {
  const presentation = SlidesApp.getActivePresentation();
  const members = convertSlidesFromPresentation(presentation);
  const page = render(members);

  SlidesApp.getUi().showSidebar(page);
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

function allFiles(thumbnailsFolder) {
  const thumbnailsFolderFiles = thumbnailsFolder.getFiles();
  const existingFiles = {}
  while(thumbnailsFolderFiles.hasNext()) {
    var nextFile = thumbnailsFolderFiles.next();
    existingFiles[nextFile.getName()] = nextFile;
  }
  return existingFiles;
}

function retrieveStoreKeywords(slide) {
  const words = getWordsFromSlide(slide);
  const keywords = extractKeywords(words);
  slide.getNotesPage().getSpeakerNotesShape().getText().appendParagraph("Keywords: " + keywords.join(','));
  return keywords;
}

function retrieveStoreKeywordsProperties(slide, key) {
  var keywords = null;
  try {
    var keywords = JSON.parse(PropertiesService.getDocumentProperties().getProperty(key));
  } catch(e) {
    // keep going
  }
  if(!keywords) {
    const words = getWordsFromSlide(slide);
    keywords = extractKeywords(words);
    PropertiesService.getDocumentProperties().setProperty(key, JSON.stringify(keywords));
  }

  return keywords;
}

function convertSlidesFromPresentation(presentation) {
  const presentationFile = DriveApp.getFileById(presentation.getId());
  const thumbnailsFolder = createThumbnailsFolder(presentationFile, getTargetFolderName());
  const slides = presentation.getSlides();
  const existingFiles = allFiles(thumbnailsFolder);
  const members = [];
  
  Logger.log('Iterating through slides');
  for(slideId in slides) {
    var slide = slides[slideId];
    var properties = getPropertiesFromNotes(slide);
    Logger.log('Properties from notes are: ' + JSON.stringify(properties));
    if(!properties || !(properties.fullname)) {
      Logger.log('No valid fullname found, skipping');
      continue;
    }

    properties.keywords = retrieveStoreKeywordsProperties(slide, 'keywords ' + properties.fullname); 
    slide.getNotesPage().getSpeakerNotesShape().getText().replaceAllText("^Keywords:.*$", "");
    
    if(properties.altnames) {
      properties.altnames = properties.altnames.split(',');
    }
    
    // needs to find the right url to get to the presentation
    properties.slideUrl = presentation.getUrl() + '/edit#slide=' + slide.getObjectId();

    var filename = properties.fullname + '.png';
    Logger.log('Creating ' + filename);
    
    var file;
    if(!existingFiles[filename]) {
      Logger.log('Creating: ' + filename);
      var contentUrl = createThumbnail(presentation, slide);
      var blob = UrlFetchApp.fetch(contentUrl).getBlob();
      file = DriveApp.createFile(blob);
      
      thumbnailsFolder.addFile(file);
      file.setName(filename);
    } else {
      Logger.log('File already exist in target folder: ' + filename);
      file = existingFiles[filename];
    }
    //var downloadUrl = file.getDownloadUrl();
    //var embedUrl = downloadUrl.substr(0, downloadUrl.indexOf('?')s);
    //properties.profileUrl = embedUrl;
    properties.profileUrl = 'https://drive.google.com/uc?id=' + file.getId();
    Logger.log(properties.profileUrl);
    members.push(properties);
  }

  return members;
}