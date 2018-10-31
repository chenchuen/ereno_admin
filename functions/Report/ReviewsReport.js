const admin = require('firebase-admin');
const firebase = require('firebase');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

exports.ReviewsReport = async(function(Data) {
  try {
    var ReviewInfo = await(getReviews(Data.Trxuid));
    if(ReviewInfo !== null){
      return {
          status: 0,
          data: ReviewInfo
        };
    } else {
      return {
          status: -1,
          data: 'No Reviews!'
        };
    }


  } catch(error) {
    console.log(error);
    return 'Failed';
  }
});

function getReviews(Trxuid) {
  return new Promise(function (resolve, reject) {
    firebase.database().ref(`Reviews/${Trxuid}`)
                    .once('value', function (snapshot) {
                        var key = snapshot.key,
                        data = snapshot.val();
                        resolve(data);
                    });
  });
}
