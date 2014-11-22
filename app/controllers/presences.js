import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    makeAbsent: function(person) {
      person.set('isPresent', false);
      person.save();
    },
    makePresent: function(person) {
      person.set('isPresent', true);
      person.save();
    }
  },

  //calculated properties
  present: function() {
    return this.get('model').filterProperty('isPresent', true);
  }.property('model.@each.isPresent'),

  absent: function() {
    return this.get('model').filterProperty('isPresent', false);
  }.property('model.@each.isPresent'),
});