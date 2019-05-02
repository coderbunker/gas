function retrieveStoreKeywords(slide) {
  const words = getWordsFromSlide(slide);
  const keywords = extractKeywords(words);
  slide.getNotesPage().getSpeakerNotesShape().getText().appendParagraph("Keywords: " + keywords.join(','));
  return keywords;
}

function retrieveStoreKeywordsProperties(slide, key) {
  var keywords = null;
  try {
    keywords = JSON.parse(PropertiesService.getDocumentProperties().getProperty(key));
  } catch(e) {
    // keep going
    Logger.log('failed to parse keywords for ' + key);
  }
  if(!keywords) {
    const words = getWordsFromSlide(slide);
    keywords = extractKeywords(words);
    PropertiesService.getDocumentProperties().setProperty(key, JSON.stringify(keywords));
  } else {
    Logger.log('already have keywords for ' + key);
  }

  return keywords;
}

function convertSlidesFromPresentation(presentation) {
  const presentationLastUpdated = getPresentationLastUpdated(presentation);
  const presentationFolder = getPresentationFolder(presentation);
  const presentationId = presentation.getId();
  const thumbnailsFolder = getDriveStorageFolder();
  const slides = presentation.getSlides();
  const members = [];
  const existingFiles = allFiles(thumbnailsFolder);

  Logger.log('Iterating through slides');
  for(slideId in slides) {
    var slide = slides[slideId];
    var properties = getPropertiesFromNotes(slide);
    var slideObjectId = slide.getObjectId();
    Logger.log('Properties from notes are: ' + JSON.stringify(properties));
    if(!properties || !(properties.fullname)) {
      Logger.log('No valid fullname found, skipping');
      continue;
    }

    //TODO: need to reactivate natural language account
    //properties.keywords = retrieveStoreKeywordsProperties(slide, 'keywords ' + properties.fullname); 
    
    if(properties.altnames) {
      properties.altnames = properties.altnames.split(',');
    }
    
    properties.slideUrl = 'https://docs.google.com/presentation/d/' + presentationId + '/edit#slide=id.' + slide.getObjectId();
    properties.objectId = slide.getObjectId();
    var filename = properties.fullname + '.png';
    var file;
    var mustUpdate = checkUpdate(thumbnailsFolder, existingFiles, filename, presentationLastUpdated);
    if(mustUpdate) {
      file = createCopyThumbnail(presentationId, slideObjectId, filename);
      thumbnailsFolder.addFile(file);
    } else {
      Logger.log('File already exist in target folder: ' + filename);
      file = existingFiles[filename];
    }
  
    properties.profileUrl = 'https://drive.google.com/uc?id=' + file.getId();
    Logger.log(properties.profileUrl);
    members.push(properties);
  }

  return members;
}

function checkUpdate(thumbnailsFolder, existingFiles, filename, presentationLastUpdated) {
  if(existingFiles[filename]) {    
    // ignored code
    const thumbnailLastUpdated = existingFiles[filename].getLastUpdated();
    const delta = (presentationLastUpdated - thumbnailLastUpdated);
    //const mustUpdate = delta > (7 * 24 * 60 * 60 * 1000); // one week
    const mustUpdate = delta > (60 * 60 * 1000); // one hour
    if(mustUpdate) {
      Logger.log('Thumbnail already exist but needs to be updated as it is too old: ' + filename + ' delta ' + delta);
      //todo: make this selective in the user interface
      //trashFile(thumbnailsFolder, existingFiles[filename]);
    }
  } else {
    return true;
  }
}

function createCopyThumbnail(presentationId, slideObjectId, filename) {
  Logger.log('Creating: ' + filename);
  const contentUrl = createThumbnail(presentationId, slideObjectId);
  const blob = UrlFetchApp.fetch(contentUrl).getBlob();
  const file = DriveApp.createFile(blob);
  file.setName(filename);
  return file;
}