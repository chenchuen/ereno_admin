const admin = require('firebase-admin');
const firebase = require('firebase');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

exports.Login = async(function(Data) {
  try {
    var response = await(logIn(Data.Email, Data.Password));
    if (response.status !== 0) {
      return response;
    }
    var UID = firebase.auth().currentUser.uid;
    var isAdmin = await(getAdmin(UID));
    if(isAdmin === null){
      return {
        status: -2,
        message: 'Account not found'
      };
    }
    var token = await(createToken(UID));
    return {token};
  } catch(error) {
    console.log(error);
    return 'Failed';
  }
});

function logIn(Email, Password){
  return new Promise(function (resolve, reject) {
    firebase.auth().signInWithEmailAndPassword(Email, Password)
      .then(function(response){
        resolve({
          status: 0
        })
      })
      .catch(function(error) {
          resolve({
            status: -1,
            message: 'Incorrect username or password'
          });
      });
  });
}

function getAdmin(Uid) {
  return new Promise(function (resolve, reject) {
    admin.database().ref(`Admin/Accounts/${Uid}`).once('value', function(snapshot) {
      }).then(function (data) {
        resolve(data.val());
      })
      .catch(function(error) {
        console.log(error);
        reject('Account not found');
      });
  });
}

function createToken(Uid) {
  return new Promise(function (resolve, reject) {
    firebase.auth().currentUser.getIdToken(true)
    .then(function(idToken) {
      resolve(idToken);
    })
    .catch(function(error) {
      console.log(error);
      reject('Account not found');
    });
  });
}
