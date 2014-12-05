import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['draggable-dropzone'],
  classNameBindings: ['dragClass'],
  dragClass: 'deactivated',
  dragLeave: function(event) {
    event.preventDefault();
    return this.set('dragClass', 'deactivated');
  },
  dragOver: function(event) {
    event.preventDefault();
    return this.set('dragClass', 'activated');
  },
  drop: function(event) {
    var data;
    this.set('dragClass', 'deactivated');
    data = event.dataTransfer.getData('text/data');
    return this.sendAction('dropped', data);
  }
});
