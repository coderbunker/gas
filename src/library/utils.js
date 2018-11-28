function isUrl(url) {
  return /^http/.exec(url);
}

function getIdFromUrl(url) { 
  if(!isUrl(url)) {
    throw new Error('Not a URL: ' + url);
  }

  return url.match(/[-\w]{25,}/); 
}
