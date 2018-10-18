function myFunction() {
 // var doc = DocumentApp.create("My document"); //create a doc
  var doc = DocumentApp.openById("1Hl-5uHunKNtfcC61Pfnsft_99b6Z4zf75AjxM60l_q4");
 // Logger.log(doc.getId())  //gets the doc id 
  var body= doc.getBody();
  var par1= body.getChild(0);
  par1.setText("I am a doc");
  par1.appendText("\nDocuments are fun!");
                  
}
