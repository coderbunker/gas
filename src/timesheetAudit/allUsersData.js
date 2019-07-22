function FreelancersInfo(freelancerInfo) {
    var arrayOfMembers = JSON.parse(DriveApp.getFileById('1YgThK0YM8d_RiEc-IBPBBft0vMEeGQGg').getBlob().getDataAsString());
    var userObject = arrayOfMembers.filter(
        function (currentUserObject) {
            Logger.log(currentUserObject)
            if (currentUserObject.fullname.toLowerCase() === freelancerInfo.toString().toLowerCase().trim()) {
                return currentUserObject;
            } else if (currentUserObject.email.toLowerCase() === freelancerInfo.toString().toLowerCase().trim()) {
                return currentUserObject;
            } else {
                if (currentUserObject.alemails !== undefined && currentUserObject.altemails.split(',').indexof(freelancerInfo.toString().toLowerCase())) {
                    return currentUserObject;
                }
            }
        }
    );
    Logger.log(userObject[0])
    Logger.log(userObject);
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