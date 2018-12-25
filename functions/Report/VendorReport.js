const admin = require('firebase-admin');
const firebase = require('firebase');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

exports.VendorReport = async(function(Data) {
  try {
    var From = new Date(Data.From).getTime();
    var To = new Date(Data.To).getTime();
    console.log(From, To);
    var FirebaseVendorInfo = await(getVendors(Data.ApprovalStatus, From, To));
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

function getVendors(ApprovalStatus, From, To){
  return new Promise(function (resolve, reject) {
    firebase.database().ref('Users/vendor')
                    .orderByChild('SignUpDate')
                    .startAt(From)
                    .endAt(To)
                    .once('value', function (snapshot) {
                      var result = [];
                      snapshot.forEach(child => {
                        if(child.val().ApprovalStatus === ApprovalStatus){
                          result.push({vendorUid: child.key , vendorInfo: child});
                        } else if(ApprovalStatus === 'Both'){
                          result.push({vendorUid: child.key , vendorInfo: child});
                        }
                      });
                      resolve(result);
                    });
  });
}
