const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const services = require('../services');
const AuthMethods = services.getConfig().AuthMethods;
const { Login } = require('./Login');

exports.ProcessRequest = async(function(req) {
  try {
    const Data = req.body.Data;
    switch (req.body.Method) {
      case AuthMethods.LOGIN:
        const response = await(Login(Data));
        console.log(response);
        return response;
      default: throw new Error('Bad Request');
    }
  } catch (error) {
    console.log(error);
    return error;
  }
});
