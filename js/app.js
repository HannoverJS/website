'use strict';

// Declare app level module which depends on filters, and services
angular.module('hannoverjs', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'views/home.tpl.html'});
    $routeProvider.when('/drinkjs', {templateUrl: 'views/drinkjs.tpl.html'});
    $routeProvider.when('/about', {templateUrl: 'views/about.tpl.html'});
    $routeProvider.when('/speakers', {templateUrl: 'views/speaker.tpl.html'});
    $routeProvider.when('/contact', {templateUrl: 'views/contact.tpl.html'});
    $routeProvider.when('/talkIdeas', {templateUrl: 'views/talk_ideas.tpl.html'});
    $routeProvider.when('/talks', {templateUrl: 'views/talks.tpl.html'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
