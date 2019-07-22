function onGoingCLients() {
    var onGoingClientsList=[];
    // get the current sheet in the active spreadSheet in this case {coderbunker opportunities account report}
    var currentSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var currentSheet = currentSpreadsheet.getSheetByName('Accounts');

    //status rows and colums values
    var statusFirstRow = 1 ;
    var statusLastRow  = currentSheet.getLastRow()-1;
    var statusFirstColumn = 1;
    var statusLastColumn = currentSheet.getLastColumn() -1;

    // status Data range
    var status = currentSheet.getRange(statusFirstRow, statusFirstColumn, statusLastRow, statusLastColumn);
    var statusValues = status.getValues();

    // iterrate on the status to pick only the status with: 'ongoing'
    for (var row in status.getValues()){
        // assign the row of a client to a variable
        var clientRow = statusValues[row];
        var name = clientRow[statusValues[0].indexOf('Client')];
        var email = clientRow[statusValues[0].indexOf('email')];
        var status =  clientRow[statusValues[0].indexOf('Status')];
        var folderRootLink = clientRow[statusValues[0].indexOf('Folder')];
        var timesheetLink = clientRow[statusValues[0].indexOf('Timesheet')];
        var auditsheetLink = clientRow[statusValues[0].indexOf('Auditsheet')];
        var groupsId = clientRow[statusValues[0].indexOf('Group Id')];

        // check is the status of the client is 'ongoing'
        if (clientRow[statusValues[0].indexOf('Status')] ==='Ongoing'){
            //push a client object to onGoingClients with clients informations (clientName, CurrentStatus, timeSheetLink, auditsheetLink)
            var clientInfo = {
                clientName: name,
                currentStatus : status,
                folderLink : folderRootLink ,
                timeSheetLink : timesheetLink,
                email : email,
                auditLink : auditsheetLink,
                groupId : groupsId
            };
            //CREATE A CLIENT REPORT SPREADSHEET IN THE CLIENT FOLDER
            onGoingClientsList.push(
                clientInfo
            );
        }
    }
    return onGoingClientsList;
}