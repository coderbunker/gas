function addEvent() {
  var ss = SpreadsheetApp.getActiveSheet();
 
  var firstRowToProcess = 2; // First row of data to process
  var numRowsToProcess = ss.getLastRow(); // Number of rows to process 
  // Fetch the range of cells (row, column, numRows, numColumns--this check column 3 is it is duplicate)
  const ADDED_COLUMN_INDEX = 6;
  var dataRange = ss.getRange(firstRowToProcess, 1, numRowsToProcess - 1, ADDED_COLUMN_INDEX);
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  
  for (var i = 0; i<data.length; i++){
    var row = data[i];
    var title = row[0];                    // 1 column
    var date = new Date(row[1]);          // 2 column
    var location = row[3];               // 4 column
    var description = row[4];           // 5 column
    
    var isBlank = ss.getRange(firstRowToProcess + i, ADDED_COLUMN_INDEX, 1, 1).isBlank();
    if (isBlank) { // Prevents sending duplicates
      var addToCal = CalendarApp.getCalendarById("ancag.munteanu@gmail.com").createAllDayEvent(title, date, {location: location, description: description});
      
      ss.getRange(firstRowToProcess + i, 6).setValue(new Date());
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }
  }
}  
