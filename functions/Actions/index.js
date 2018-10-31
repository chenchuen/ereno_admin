const admin = require('firebase-admin');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const services = require('../services');
const ActionMethods = services.getConfig().ActionMethods;
const { ApproveVendor } = require('./ApproveVendor');

exports.ProcessRequest = async(function(req) {
  try {
    const Data = req.body.Data;
    var TokenInfo = await(checkToken(Data.Token));
    var response;
    switch (req.body.Method) {
      case ActionMethods.APPROVE_VENDOR:
        response = await(ApproveVendor(Data));
        break;
      default: throw new Error('Bad Request');
    }

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
});

function checkToken(Token) {
  return new Promise(function (resolve, reject) {
    admin.auth().verifyIdToken(Token)
    .then(function(decodedToken) {
      resolve(decodedToken);
    }).catch(function(error) {
      console.log(error);
      reject({error: 'Token invalid'});
    });
  });
}
