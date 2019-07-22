var rawInfo = onGoingCLients();
function Report(){
  rawInfo.map(function(e) {
        if (e.clientName === 'Coderbunker'){
          timeSheetReport(e);
          googleGroupReport(e);
        }
      }
  );
  // rawInfo.forEach(function(e){
  //   if(e.clientName == 'Coderbunker'){
  //     timeSheetReport(e);
  //     googleGroupReport(e);
  //   };
  // }
  //                );
}