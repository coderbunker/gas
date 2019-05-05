/**
 * @OnlyCurrentDoc
 */

function onOpen() {
  const orgName = PropertiesService.getScriptProperties().getProperty('ORG_NAME');
  SlidesApp.getUi()
      .createMenu(orgName)
      .addItem('Authorize script permissions', 'showSidebar')
      .addItem('Search', 'showSearch')
      .addItem('Show thumbnails (unsorted)', 'showThumbnailsSidebarUnsorted')
      .addItem('Show thumbnails (sorted by name)', 'showThumbnailsSidebarSorted')
      .addItem('Update thumbnails', 'convertSlides')
      .addItem('Snapshot to database server', 'snapshot')
      .addItem('Convert to spreadsheet', 'convertToSpreadsheet')
      .addItem('Convert to JSON', 'convertToJson')
      .addItem('Show document properties', 'showProperties')
      .addItem('Logout', 'clearService')
      .addToUi();
}



function showThumbnailsSidebarSorted() {
  const members = getJsonDocAsObject();
  const sortedMembers = members.sort(function(m1, m2) {
    return m1.fullname.localeCompare(m2.fullname);
  });
  const page = renderMembers(sortedMembers);
  SlidesApp.getUi().showSidebar(page);
}

function showThumbnailsSidebarUnsorted() {
  const members = getJsonDocAsObject();
  const page = renderMembers(members);
  SlidesApp.getUi().showSidebar(page);
}

function convertSlides() {
  const presentation = SlidesApp.getActivePresentation();
  const members = convertSlidesFromPresentation(presentation);
  const page = renderMembers(members);
  SlidesApp.getUi().showSidebar(page);
}

function convertToSpreadsheet() {
  const members = getJsonDocAsObject();
  const spreadsheetUrl = exportToSpreadsheet(members);
  console.log(spreadsheetUrl);
  showUrl(spreadsheetUrl);
}

function convertToJson() {
  const docId = getJsonDocId();
  const docUrl = getUrl(docId);
  showUrl(docUrl);
}

function showUrl(url) {
  var template = HtmlService.createTemplate(
    'Export to : <a href="<?= url ?>" target="_blank">url</a> ');
  template.url = url;
  const page = template.evaluate();
  SlidesApp.getUi().showSidebar(page);
}

function showProperties() {
  const properties = PropertiesService.getDocumentProperties();
  const kv = properties.getProperties();
  const page = renderKeyValues(kv);
  SlidesApp.getUi().showSidebar(page);
}

function showSearch() {
  const page = HtmlService.createHtmlOutputFromFile('search');
  SlidesApp.getUi().showSidebar(page);
}