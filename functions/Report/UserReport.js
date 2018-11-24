const admin = require('firebase-admin');
const firebase = require('firebase');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

exports.UserReport = async(function(Data) {
  try {
    var From = new Date(Data.From).getTime();
    var To = new Date(Data.To).getTime();

    if(Data.Email !== ''){
      var FirebaseUserInfo = await(getUserByEmail(Data.Email));
      var UserInfo = await(getUserInfoByUid(FirebaseUserInfo.uid, Data.UserType));
    } else {
      var UserInfo = await(getUserInfoByDateRange(Data.UserType, From, To));
    }
    if(UserInfo !== null){
      return {
          status: 0,
          data: UserInfo
        };
    } else {
      return {
          status: -1,
          data: 'User not found'
        };
    }
  } catch(error) {
    console.log(error);
    return 'Failed';
  }
});

function getUserInfoByUid(userId, userType){
  return new Promise(function (resolve, reject) {
    firebase.database().ref(`Users/${userType}/${userId}`)
                    .once('value', function (snapshot) {
                        resolve(snapshot.val());
                    });
  });
}

function getUserInfoByDateRange(userType, from, to){
  console.log(from, to);
  return new Promise(function (resolve, reject) {
    firebase.database().ref(`Users/${userType}`)
                    .orderByChild('SignUpDate')
                    .startAt(from)
                    .endAt(to)
                    .once('value', function (snapshot) {
                        resolve(snapshot.val());
                    });
  });
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
