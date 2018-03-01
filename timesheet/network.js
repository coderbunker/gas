function postData(id, doc, endpoint) {
  const options = {
    method : 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      id: id,
      doc: doc
    })
  };
  return UrlFetchApp.fetch(endpoint, options);
}