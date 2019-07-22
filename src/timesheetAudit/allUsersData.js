function FreelancersInfo(freelancerInfo) {
  var arrayOfMembers = JSON.parse(DriveApp.getFileById('1YgThK0YM8d_RiEc-IBPBBft0vMEeGQGg').getBlob().getDataAsString());
  var userObject = arrayOfMembers.filter(
    function(currentUserObject){
      //Logger.log(currentUserObject)
      if(currentUserObject['fullname'].toLowerCase().trim() === freelancerInfo.toString().toLowerCase().trim()){
        return currentUserObject;
      }
      /*else if (currentUserObject['altnames']!== undefined)
      {
        var altNamesArray = currentUserObject['altnames'].split(',').toLowerCase()
        if (altNamesArray.trim().indexOf(freelancerInfo.toString().toLowerCase().trim())!== -1){
          return currentUserObject;
        }
      }*/
      else if(currentUserObject['email'] !== undefined && currentUserObject['email'].toString().toLowerCase().trim() === freelancerInfo.toString().toLowerCase().trim()){ 
        return currentUserObject;
      }
      /*else{
        if(currentUserObject['altemails'] !== undefined  
           //("'"+currentUserObject['altemails']+"'".includes(freelancerInfo.toString().toLowerCase()))
          ){
          if(currentUserObject['altemails'].toString().includes(freelancerInfo.toString().toLowerCase())){
          //var altEmailsArray = currentUserObject['altemails'].toString().split(',').toLowerCase()
          //if ( altEmailsArray.indexOf(freelancerInfo.toString().toLowerCase()) !== -1){
            return currentUserObject;
          }
        }
      }*/
    }
  )[0];
  return userObject;
  // for (var object in arrayOfMembers){
  //   var name = arrayOfMembers[object].fullname.toLowerCase();
  //   // CHECK IF THERE AN ALTEMAIL OR NOT TO ASSIGN IT TO THE PERSON EMAILS
  //   var emails = arrayOfMembers[object].email ;
  //   var altemail = arrayOfMembers[object].altemails;
  //   if ((name.trim()  || emails.trim() || altemail.trim() ) === freelancerInfo.toString().toLowerCase().trim()){
  //     if (altemail !== undefined){
  //       return {
  //         name : name,
  //         email: emails,
  //         altemails : altemail
  //       }
  //     }else{
  //       return {
  //         name : name,
  //         email: emails,
  //       };
  //     }
  //   }
  // }
}