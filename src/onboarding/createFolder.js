//Create folder if does not exists only
function createFolder(){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Emails");
  var firstRowToProcess = 2; // First row of data to process
  var numRowsToProcess = sheet.getLastRow(); // Number of rows to process 
  // Fetch the range of cells (row, column, numRows, numColumns--this check column 3 is it is duplicate)
  const SENT_COLUMN_INDEX = 3;
  var dataRange = sheet.getRange(firstRowToProcess, 1, numRowsToProcess - 1, SENT_COLUMN_INDEX);
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var name = row[0]; // First column
    var email = row[1]; // Second column
 
    var folderID = "0B-PYJiOSewXLUE1obURNLURxX1k"
    var folderName = name;
    var parentFolder = DriveApp.getFolderById(folderID);
    var subFolders = parentFolder.getFolders();
    var folderExists = false;
    var newFolder = '';
  
    // Check if folder already exists.
    while(subFolders.hasNext()){
      var folder = subFolders.next();
    
      //If the name exists return the id of the folder
      if(folder.getName() === folderName){
        folderExists = true;
        newFolder = folder;
        return 
        //If the name doesn't exists, then create a new folder
      } else {
        //If the file doesn't exists
        newFolder = parentFolder.createFolder(folderName);
        var newFolderID = newFolder.getId();
        var accessFreelancer = newFolder.setOwner(email);
       
        var file = DriveApp.getFileById('1CWqLtG9G7GgfMzSP110LSRmaBnZlMtX0D3kNOuPZr6g');
        var destinationFolder = DriveApp.getFolderById(newFolderID);
        var makeCopy = file.makeCopy(folderName + ' Coderbunker Resident Freelancer', destinationFolder);
       
        return newFolder.getId();
      }
    }
  }
}

       
       /*var doc = DocumentApp.create(folderName + ' Coderbunker Resident Freelancer'),
           docFile = DriveApp.getFileById( doc.getId() );

       DriveApp.getFolderById(newFolderID).addFile( docFile );
       DriveApp.getRootFolder().removeFile(docFile)
       var getDocumentUrl = doc.getUrl();
       var getFolderUrl = newFolder.getUrl();
       
       
      /* var docID = '1CWqLtG9G7GgfMzSP110LSRmaBnZlMtX0D3kNOuPZr6g';
       var baseDoc = DocumentApp.openById(docID);
       var body = baseDoc.getBody();

       var otherBody = DocumentApp.openByUrl(getDocumentUrl).getBody();
       var totalElements = otherBody.getNumChildren();
       for( var j = 0; j < totalElements; ++j ) {
         var element = otherBody.getChild(j).copy();
         var type = element.getType();
         if( type == DocumentApp.ElementType.PARAGRAPH )
           body.appendParagraph(element);
         else if( type == DocumentApp.ElementType.TABLE )
           body.appendTable(element);
         else if( type == DocumentApp.ElementType.LIST_ITEM )
           body.appendListItem(element);
         else if( type == DocumentApp.ElementType.INLINE_IMAGE )
           body.appendImage(element);

    // add other element types as you want

         else
           throw new Error("According to the doc this type couldn't appear in the body: "+type);
  }*/
       
       
  

