function getPropertiesFromNotes(slide) {
  const lines = slide.getNotesPage().getSpeakerNotesShape().getText().asString().split('\n');
  Logger.log(lines);
  return extractPropertiesFromLines(lines);
}

function extractPropertiesFromLines(lines) {
  lines = lines.map(function(l) { return l.trim(); }).filter(function(l) { return l.length>0; });
  if(lines.length === 0) {
    return null;
  }
  var properties = {}
  for(line in lines) {
    var l = lines[line];
    var m = l.match(/(.+?)\s*:\s*(.+)/);
    if(m && m.length === 3) {
      properties[m[1].toLowerCase()] = m[2];
    }
  }
  
  return properties; 
}

function extractKeywords(input) {
  const naturalLanguageApiKey = PropertiesService.getScriptProperties().getProperty('naturalLanguageApiKey');
  const apiEndpoint = "https://language.googleapis.com/v1/documents:analyzeEntities?key=" + naturalLanguageApiKey;
  
  const docDetails = {
    language: 'en-us',
    type: 'PLAIN_TEXT',
    content: input
  };
  const nlData = {
    document: docDetails,
    encodingType: 'UTF8'
  };
  const nlOptions = {
    method : 'post',
    contentType: 'application/json',
    payload : JSON.stringify(nlData)
  };
  const response = UrlFetchApp.fetch(apiEndpoint, nlOptions);
  const data = JSON.parse(response);
  const keywords = data.entities
  .filter(function(e) { return e.type != 'PERSON'})
  .map(function(e) {
    return e.name;
  })
  return keywords;
}

function getWordsFromSlide(slide) {
  const words = slide.getPageElements().reduce(function(p, e) {
    const type = e.getPageElementType();
    if(type == 'SHAPE') {
      const t = e.asShape().getText().asString();
      return p + t;
    }
    return p;
  }, '');
  return words;
}