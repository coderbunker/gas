//Create folder if does not exists only
function createFolder(folderID, folderName){
  var folderID = "0B-PYJiOSewXLUE1obURNLURxX1k"
  var folderName = "Louis Bouteille"
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
       var accessFreelancer = newFolder.setOwner("bouteillelouis.bl@gmail.com");
       
       var doc = DocumentApp.create(folderName + ' Coderbunker Resident Freelancer'),
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
       
       
       return newFolder.getId();
     }
  }
}


