function doGet(e) {
  const jsonText = getJsonDocAsText();
  return ContentService
    .createTextOutput(jsonText)
    .setMimeType(ContentService.MimeType.JSON);  
}