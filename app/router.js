import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('presences', { path: '/' }, function(){
    // this.route('all');
    // this.route('absent');
    // this.route('present');
  });
});


export default Router;
