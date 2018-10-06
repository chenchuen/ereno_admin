import admin from 'firebase-admin';
// import serviceAccount from '../../aladdinapp-942fe-firebase-adminsdk-j60zx-9cf851fd22.json';

import { call, put, take } from 'redux-saga/effects'
import Types from '../../Redux/Reports/types';

export function* watchGetCustomerInfo() {
  while (true) {
    const { email } = yield take(Types.REPORT_GET_CUSTOMER_INFO_ATTEMPT);
    yield call(getCustomerInfo, email);
  }
}

export function* getCustomerInfo(email) {
  // console.log(serviceAccount);
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  //   databaseURL: 'https://aladdinapp-942fe.firebaseio.com'
  // });
  // admin.auth().getUserByEmail(email)
  //   .then((userRecord) => {
  //     // See the UserRecord reference doc for the contents of userRecord.
  //     console.log("Successfully fetched user data:", userRecord);
  //   })
  //   .catch((error) => {
  //     console.log("Error fetching user data:", error);
  //   });

  console.log(email);
}
