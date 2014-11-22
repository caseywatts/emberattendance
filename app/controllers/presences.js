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
    },
    createAbsentPerson: function() {
      var newName = this.get('newAbsenceName');
      var person = this.store.createRecord('presence', {
        isPresent: false,
        name: newName
      });
      this.set('newAbsenceName', '');
      person.save();
    },
    createPresentPerson: function() {
      var newName = this.get('newPresenceName');
      var person = this.store.createRecord('presence', {
        isPresent: true,
        name: newName
      });
      this.set('newPresenceName', '');
      person.save();
    },
    removePerson: function(person) {
      person.deleteRecord();
      person.save();
    },
    importPeople: function() {
      var peopleList = this.get('importList');
      var peopleArray = peopleList.split("\n");
      var store = this.store;
      peopleArray.forEach(function(name){
        var person = store.createRecord('presence', {
          isPresent: false,
          name: name
        });
        person.save();
      })
      this.set('importList', '');
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