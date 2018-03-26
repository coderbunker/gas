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
    
    properties.slideUrl = 'https://docs.google.com/presentation/d/' + presentation.getId() + '/edit#slide=id.' + slide.getObjectId();
    properties.objectId = slide.getObjectId();
    
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