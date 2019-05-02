function exportToPostData(doc) {
  const id = doc.getId();
  const name = doc.getName();
  const data = convertSlidesFromPresentation(doc);
  const payload = {
    id:id, 
    name: name, 
    data: data,
    apptype: 'Slides',
    category: 'Freelancers'
  };
  return payload;
}

function snapshot() {
  const exported = exportToPostData(SlidesApp.getActivePresentation())
  const endpoint = PropertiesService.getScriptProperties().getProperty('SNAPSHOT_ENDPOINT');
  const output = postData(SlidesApp.getActivePresentation().getId(), exported, endpoint);
  Logger.log(output);
}