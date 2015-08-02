angular.module('lodash', []).factory('_', function($window) {
  'use strict';
  return $window._;
});

angular.module('jquery', []).factory('$', function($window) {
  'use strict';
  return $window.$;
});

angular.module('app.ctrl', []);
angular.module('app.templates', []);

angular.module('app', [
  'ngRoute',
  'lodash',
  'jquery',
  'app.ctrl',
  'app.templates',
])
.config(function($routeProvider, $locationProvider) {
  'use strict';

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      controller: 'HelloCtrl',
      controllerAs: 'helloCtrl',
      templateUrl: 'pages/hello.html',
      title: 'Hello',
    })
    .when('/contact', {
      controller: 'ContactCtrl',
      controllerAs: 'contactCtrl',
      templateUrl: 'pages/contact.html',
      title: 'Contact',
    });
});
