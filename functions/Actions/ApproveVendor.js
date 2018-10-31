const admin = require('firebase-admin');
const firebase = require('firebase');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

exports.ApproveVendor = async(function(Data) {
  try {
    UpdateVendorStatus(Data.Uid);
    return {
        status: 0,
        data: 'Done!'
      };
  } catch(error) {
    console.log(error);
    return {
        status: -1,
        data: 'Update Failed'
      };
  }
});

function UpdateVendorStatus(uid){
  firebase.database().ref(`Users/vendor/${uid}`)
                  .update({
                    ApprovalStatus: 'Approved'
                  });
}
