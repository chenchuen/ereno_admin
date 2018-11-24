const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const services = require('../services');
const AuthMethods = services.getConfig().AuthMethods;
const { Login } = require('./Login');

exports.ProcessRequest = async(function(req) {
  try {
    const Data = req.body.Data;
    var response;
    switch (req.body.Method) {
      case AuthMethods.LOGIN:
        response = await(Login(Data));
        break;
      default: throw new Error('Bad Request');
    }
    return response;
  } catch (error) {
    console.log(error);
    return {
      status: -1,
      message: error.message,
    };
  }
});
