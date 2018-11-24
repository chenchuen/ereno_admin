const admin = require('firebase-admin');
const firebase = require('firebase');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

exports.LoginReport = async(function(Data) {
  try {
    var From = new Date(Data.From).getTime();
    var To = new Date(Data.To).getTime();
    var UserInfo = await(getUserInfoByDateRange(Data.UserType, From, To));
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

function getUserInfoByDateRange(userType, from, to){
  console.log(from, to);
  return new Promise(function (resolve, reject) {
    firebase.database().ref(`Users/${userType}`)
                    .orderByChild('LastLoginDate')
                    .startAt(from)
                    .endAt(to)
                    .once('value', function (snapshot) {
                        resolve(snapshot.val());
                    });
  });
}
