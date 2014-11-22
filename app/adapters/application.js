// /* globals Firebase */

// // import DS from 'ember-data';

// // export default DS.FirebaseAdapter.extend({
// //   firebase: new Firebase('https://emberattendance.firebaseio.com')
// // });

import DS from 'ember-data';

export default DS.LSAdapter.extend({
  namespace: 'emberattendance'
});