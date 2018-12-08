function updateIndexAll() {
  const exportFolderId = PropertiesService.getScriptProperties().getProperty('EXPORT_FOLDER_ID');
  const folder = DriveApp.getFolderById(exportFolderId);
  
  const sheet = SpreadsheetApp.getActiveSheet();
  const maxColumn = sheet.getLastColumn();
  const maxRow = sheet.getLastRow();
  const mapping = getHeaderMapping(sheet);
  
  for(var i=maxRow; i>=2; i--) {
    var range = sheet.getRange(i, 1, i, maxColumn);
    if(!range) {
      throw new Error('Invalid row ' + i);
    }
    updateIndex(folder, range, mapping);
  }
}

function updateCurrentRow() {
  const exportFolderId = PropertiesService.getScriptProperties().getProperty('EXPORT_FOLDER_ID');
  const folder = DriveApp.getFolderById(exportFolderId);
  
  const sheet = SpreadsheetApp.getActiveSheet();
  const maxColumn = sheet.getLastColumn();
  const row = sheet.getActiveCell().getRow()
  const mapping = getHeaderMapping(sheet);
  const range = sheet.getRange(row, 1, row, maxColumn);
  updateIndex(folder, range, mapping);
}

function updateIndex(folder, range, mapping) {
  const values = range.getValues();
  console.log(values);
  var atLeastOneUpdate = false;
  values.forEach(function(row) {
    atLeastOneUpdate = atLeastOneUpdate || processRow(folder, row, mapping);
  });
  
  if(atLeastOneUpdate) {
    range.setValues(values);
  }
}

/**
 * @return {boolean} if the properties were updated or not
 */
function processRow(folder, row, mapping) {
  var url = row[mapping['Document URL']];
  if(!isUrl(url)) {
     return false;
  }
  
  var subfolder = row[mapping['Audience']];
  
  var sourceFileId = getIdFromUrl(url);
  var sourceFile = DriveApp.getFileById(sourceFileId);
  var name = sourceFile.getName();
  
  var /** @type {File} */ exportFile;
  var updateProperties = false;

  // look at what is stored there and make sure the file actually exist
  if(row[mapping['Exported PDF URL']]) {
    console.log(row);
    var exportFileId = getIdFromUrl(row[mapping['Exported PDF URL']]);
    exportFile = DriveApp.getFileById(exportFileId);
  // search by name in the folder
  } else {
    exportFile = searchName(folder, name);
    // strange, we didn't find it so maybe the data got deleted
    // treat it as a new export
    updateProperties = true;
  }
  // if that doesn't work, export a new copy of the file
  if(!exportFile) {
    exportFile = export(folder, sourceFile, sourceFileId);
    updateProperties = true;
  }
  
  // if the exported file is older than document, remove, trash and reexport
  if(exportFile.getLastUpdated() < sourceFile.getLastUpdated()) {
    folder.removeFile(exportFile);
    exportFile.setTrashed(true);
    exportFile = export(folder, sourceFile, sourceFileId);
    updateProperties = true;
  }
  
  // update properties if this is a new export
  // or properties deleted
  if(updateProperties) {
    row[mapping['Title']] = getDocName(row[mapping['Document URL']]);
    row[mapping['Last Export']] = exportFile.getLastUpdated();
    row[mapping['Last Update']] = sourceFile.getLastUpdated();
    row[mapping['Exported PDF URL']] = exportFile.getUrl();
  }

  return updateProperties;
}