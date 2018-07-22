function postData(id, doc, endpoint) {
  const apikey = PropertiesService.getScriptProperties().getProperty('APIKEY');
  if(!apikey) {
    throw new Error('No APIKEY found in Script Properties');
  }
  const options = {
    method : 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      id: id,
      doc: doc,
      apikey: apikey
    }),
    muteHttpExceptions: true
  };
  return UrlFetchApp.fetch(endpoint, options);
}