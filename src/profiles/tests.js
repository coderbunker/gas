function getTestPresentationId() {
  return '1LvvSUc4VEU9hSSgi1x8PJWA_lBZ5ne7Few76U6CCFXI';
}

function test_getPropertiesFromNotes() {
  const presentation = SlidesApp.openById(getTestPresentationId());
  const slide = presentation.getSlides()[6];
  const properties = getPropertiesFromNotes(slide);
  if(!properties) {
    throw Error('Null output');
  }
  if(properties.fullname !== 'Ricky Ng-Adam') {
    throw Error('Wrong object: ' + JSON.stringify(properties));
  }
  Logger.log(properties);
  return properties;
}

function test_createThumbnailsFolder() {
  const name = 'testThumbnails';
  const presentationId = getTestPresentationId();
  const presentationFile = DriveApp.getFileById(presentationId);
  const presentationFolder = presentationFile.getParents().next();
  Logger.log('Name: ' + presentationFolder);
  const siblingsBefore = presentationFolder.getFoldersByName(name);
  while (siblingsBefore.hasNext()) {
    var folder = siblingsBefore.next();
    Logger.log('Before: Removing ' + folder.getName())
    presentationFolder.removeFolder(folder);
    folder.setTrashed(true);
  }
  const thumbnailsFolder = createThumbnailsFolder(presentationFile, name);
  
  const siblingsAfter = DriveApp.getFolderById(presentationFolder.getId()).getFoldersByName(name);
  var count = 0;
  while (siblingsAfter.hasNext()) {
    count++;
    var folder = siblingsAfter.next();
    Logger.log('Found after (removing) ' + folder.getName())
    presentationFolder.removeFolder(folder);
    folder.setTrashed(true);
  }
  if(count !== 1) {
    throw Error('expecting only one created folder, found ' + count);
  }
}

function test_convertSlidesFromPresentation() {
  const members = convertSlidesFromPresentation(SlidesApp.openById(getTestPresentationId()));
  Logger.log(members);
}

function test_extractPropertiesFromLines() {
  var properties = extractPropertiesFromLines(['Fullname: something: something else']);
  if(properties.fullname != 'something: something else') {
    throw Error('unexpected ' + properties.fullname);
  }
}

function test_getWordsFromSlide() {
  const presentation = SlidesApp.openById(getTestPresentationId());
  const slide = presentation.getSlides()[6];
  const keywords = getWordsFromSlide(slide);
  Logger.log(keywords);
}

function test_extractKeywords() {
  const inputText = "Ricky Ng Adam Founder of Coderbunker rngadam@coderbunker.com Specialties: 20 years experience in software development and testing, Architecture, design, R&D, engineering team recruitment, building and coaching Full stack development cross-language (Javascript, Python, C/C++, shell) from frontend MVC framework (React), API servers (REST, Websockets, GraphQL), database (PostgreSQL), deployment (Linux, Ansible)"
  const keywords =  extractKeywords(input);
  Logger.log(keywords);
}

function test_retrieveStoreKeywords() {
  const presentation = SlidesApp.openById(getTestPresentationId());
  const slide = presentation.getSlides()[6];
  const keywords = retrieveStoreKeywords(slide);
  Logger.log(keywords);
}