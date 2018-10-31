const admin = require('firebase-admin');
const firebase = require('firebase');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

exports.TransactionReport = async(function(Data) {
  try {
    var From = new Date(Data.From).getTime();
    var To = new Date(Data.To).getTime();
    var result = await(getTransactions(From, To, Data.Index));
    var filteredResult = {};

    if(Data.TransactionId !== ''){
      if(result[Data.TransactionId] !== undefined){
        filteredResult[Data.TransactionId] = result[Data.TransactionId];
        return {
            status: 0,
            data: filteredResult
          };
      } else {
        return {
            status: -1,
            data: 'No Data'
          };
      }
    }

    if(Data.Email !== ''){
      try{
        var UserInfo = await(getUserByEmail(Data.Email));
        filteredResult = filterByUid(result, UserInfo.uid);
        if(filteredResult !== {}){
          return {
            status: 0,
            data: filteredResult
          };
        } else {
          return {
            status: -1,
            data: 'No Data'
          };
        }
      } catch(e){
        return {
            status: -1,
            data: 'No Data'
          };
      }
    }

    if(filteredResult === undefined || result === null){
      return {
          status: -1,
          data: 'No Data'
        };
    }
    return {
      status: 0,
      data: result
    };
  } catch(error) {
    console.log(error);
    return 'Failed';
  }
});

function getTransactions(From, To, index) {
  return new Promise(function (resolve, reject) {
    firebase.database().ref('Transactions')
                    .orderByChild('createdDate')
                    .startAt(From)
                    .endAt(To)
                    .limitToFirst(50)
                    .once('value', function (snapshot) {
                        var key = snapshot.key,
                        data = snapshot.val();
                        resolve(data);
                    });
  });
}

function filterByUid(result, uid) {
  var endResult = {};
  Object.keys(result).forEach(function (key) {
    if(result[key].customerUID === uid || result[key].vendorUID === uid){
      endResult[key] = result[key];
    }
  });
  return endResult;
}

function getUserByEmail(Email) {
  return new Promise(function (resolve, reject) {
    admin.auth().getUserByEmail(Email)
      .then(function (userRecord) {
        return userRecord.toJSON();
      })
      .then(function (result){
        resolve(result);
      })
      .catch(function(error) {
        reject(-1);
      });
  });
}
