import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('presence');
  },
  // actions: {
  //   makeAbsent: function() {
  //       // var person = this.store.find('presence', 1);
  //       this.set('isPresent', false);
  //       this.save();
  //       //find the user
  //       //make the user absent
  //       //save
  //   },
  // }
});
