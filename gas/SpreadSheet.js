function myFunction() {
  var ss= SpreadsheetApp.openById("1iDAmwugkIEV9lB17f7GizKHEw2lfWSy1jMbXzCsOmzY");
  /*var activeSheet= ss.getActiveSheet();
  var targetCell= activeSheet.setActiveSelection("B2");
  targetCell.setValue("hello");
  ss.insertSheet("A new first sheet", 0);*/
  
  var theRange= ss.getDataRange();
  Logger.log(theRange.getA1Notation()); //see where the info is, which cells
  var theManualRange= ss.getRange("A2:D5");
  var vals= theManualRange.getValues();
  for(i=0; i<vals.length; i++){
    //Logger.log(vals[i][0]);
    var fname= vals[i][0];
    var lname= vals[i][1];
    var topic= vals[i][2];
    Logger.log(fname + " " + lname + " " + topic);
  }
}
