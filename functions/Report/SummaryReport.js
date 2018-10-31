const admin = require('firebase-admin');
const firebase = require('firebase');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

exports.SummaryReport = async(function(Data) {
  try {
    var From = new Date(Data.From).getTime();
    if(Data.Format === 'M'){
      var To = new Date(Data.From).setMonth(new Date(Data.From).getMonth()+1);
    } else if(Data.Format === 'Y'){
      var To = new Date(Data.From).setFullYear(new Date(Data.From).getFullYear()+1);
    } else {
      throw Error('Bad request');
    }
    var PaymentInfo = await(getPaymentInfo(From, To));
    var grossEarnings = 0;
    var invalidEarnings = 0;
    var totalTransactions = 0;
    var totalValidTransactions = 0;

    Object.keys(PaymentInfo).forEach(function (key) {
      totalTransactions++;
      if(PaymentInfo[key].status === 'Confirmed'){
        totalValidTransactions++;
        grossEarnings += parseFloat(PaymentInfo[key].Amount);
      } else {
        invalidEarnings += parseFloat(PaymentInfo[key].Amount);
      }
    });
    var result = {
      grossEarnings,
      netEarnings: (grossEarnings * 0.70).toFixed(4),
      invalidEarnings,
      totalTransactions,
      totalValidTransactions,
    }
    return {
      status: 0,
      data: result
    };
  } catch(error) {
    console.log(error);
    return {
      status: -1,
      data: 'Something went wrong!'
    };
  }
});

function getPaymentInfo(From, To) {
  return new Promise(function (resolve, reject) {
    firebase.database().ref('Payments')
                    .orderByChild('createdDate')
                    .startAt(From)
                    .endAt(To)
                    .once('value', function (snapshot) {
                        resolve(snapshot.val());
                    });
  });
}
