const admin = require('firebase-admin');
const firebase = require('firebase');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

exports.VendorReport = async(function(Data) {
  try {
    var FirebaseVendorInfo = await(getVendors(Data.ApprovalStatus));
    if(FirebaseVendorInfo !== null){
      return {
          status: 0,
          data: FirebaseVendorInfo
        };
    } else {
      return {
          status: -1,
          data: 'No Vendor Found'
        };
    }
  } catch(error) {
    console.log(error);
    return 'Failed';
  }
});

function getVendors(ApprovalStatus){
  return new Promise(function (resolve, reject) {
    firebase.database().ref('Users/vendor')
                    .orderByChild('ApprovalStatus')
                    .equalTo(ApprovalStatus)
                    .once('value', function (snapshot) {
                        resolve(snapshot.val());
                    });
  });
}
