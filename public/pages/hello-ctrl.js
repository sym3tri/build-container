angular.module('app.ctrl')
.controller('HelloCtrl', function() {
  'use strict';

  this.message = function() {
    return 'hello';
  };

});
