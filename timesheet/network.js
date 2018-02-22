function postData(endpoint, data) {
  const options = {
    method : 'post',
    contentType: 'application/json',
    payload : JSON.stringify(data)
  };
  return UrlFetchApp.fetch(endpoint, options);
}