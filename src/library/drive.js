
function export(folder, sourceFile, sourceFileId) {
  const blob = sourceFile.getAs('application/pdf');
  file = DriveApp.createFile(blob);
  file.setDescription(sourceFileId);
  folder.addFile(file);
  return file;
}

function searchName(folder, name) {
  const iterator = folder.getFilesByName(name + '.pdf');
  if(!iterator.hasNext()) {
    return null;
  };
  return iterator.next();
}

function getDocName(url) {
  const id = getIdFromUrl(url);
  const file = DriveApp.getFileById(id);
  const mime = file.getMimeType();
  
  if(mime === 'application/vnd.google-apps.document') {
    return DocumentApp.openByUrl(url).getName();
  } else if(mime === 'application/vnd.google-apps.presentation') {
    return SlidesApp.openByUrl(url).getName();
  } else if(mime === 'application/vnd.google-apps.spreadsheet') {
    return SpreadsheetApp.openByUrl(url).getName();
  } else {
    throw new Error("unsupported: " + mime);
  }
}