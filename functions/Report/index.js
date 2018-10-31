const admin = require('firebase-admin');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const services = require('../services');
const ReportMethods = services.getConfig().ReportMethods;
const { TransactionReport } = require('./TransactionReport');
const { UserReport } = require('./UserReport');
const { LoginReport } = require('./LoginReport');
const { VendorReport } = require('./VendorReport');
const { ReviewsReport } = require('./ReviewsReport');

exports.ProcessRequest = async(function(req) {
  try {
    console.log(req.body.Data);
    const Data = req.body.Data;
    var TokenInfo = await(checkToken(Data.Token));
    var response;
    switch (req.body.Method) {
      case ReportMethods.TRANSACTION:
        response = await(TransactionReport(Data));
        break;
      case ReportMethods.USER:
        response = await(UserReport(Data));
        break;
      case ReportMethods.LOGINLOG:
        response = await(LoginReport(Data));
        break;
      case ReportMethods.VENDOR:
        response = await(VendorReport(Data));
        break;
        case ReportMethods.REVIEW:
          response = await(ReviewsReport(Data));
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
      reject({
        status: -1,
        data: 'Token invalid'
      });
    });
  });
}
