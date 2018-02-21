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