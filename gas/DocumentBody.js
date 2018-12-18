function myFunction() {
  
  
  var file = DriveApp.getFileById('1CWqLtG9G7GgfMzSP110LSRmaBnZlMtX0D3kNOuPZr6g');
  var destinationFolder = DriveApp.getFolderById('13wkizXmx97M5zqcXf5It-H8I-82ixOXv');
  var makeCopy = file.makeCopy('ancatest', destinationFolder);

}


