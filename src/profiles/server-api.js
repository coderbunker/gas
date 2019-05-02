function find(arr, callback) {
    "use strict";
    var
        arrLen = arr.length,
        i;
    for (i = 0; i < arrLen; i += 1) {
        if (callback.call(arr, arr[i], i, arr)) {
            return arr[i];
        }
    }
    return undefined;
}

function gotoSlide(slideId) {
  const slides = SlidesApp.getActivePresentation().getSlides();
  const slide = find(slides, function(s) {
    Logger.log(s.getObjectId());
    if(s.getObjectId() === slideId) 
      return true;
    return false;
  })
  slide.selectAsCurrentPage();
}

function deleteKey(key) {
  PropertiesService.getDocumentProperties().deleteProperty(key);
}

function deleteAllProperties() {
  PropertiesService.getDocumentProperties().deleteAllProperties();
}

function getKeyValue(key) {
  return PropertiesService.getDocumentProperties().getProperty(key);
}