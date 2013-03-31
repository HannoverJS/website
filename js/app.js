'use strict';

// Declare app level module which depends on filters, and services
angular.module('hannoverjs', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'views/home.tpl.html', controller: 'TalkDateController'});
    $routeProvider.when('/drinkjs', {templateUrl: 'views/drinkjs.tpl.html'});
    $routeProvider.when('/about', {templateUrl: 'views/about.tpl.html'});
    $routeProvider.when('/speakers', {templateUrl: 'views/speaker.tpl.html'});
    $routeProvider.when('/contact', {templateUrl: 'views/contact.tpl.html'});
    $routeProvider.when('/talkIdeas', {templateUrl: 'views/talk_ideas.tpl.html'});
    
    //that feels super lame, actually we just want to get access to the dateService here and then
    //redirect to the route for the next date. Couldn't get that to work and so we use
    //a dummy controller and also a dummy template because otherwise the controller would't be invoked
    $routeProvider.when('/talks', { template: '<div></div>', controller: 'CurrentTalkController'});
    
    $routeProvider.when('/talks/:month/:year', {template: '<div ng-include="templateUrl"></div>', controller: 'TalksController'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

angular.module('hannoverjs')
       .service('dateService', function(){
            var self = {};

            var hannoverJsMonth = 'odd',
                hannoverJsWeekday = 4,
                //can be either 1, 2, 3 or 4 (e.g first, second, third or fourth Weekday of Month)
                hannoverJsRhythm = 4;

            var isEven = function(someNumber){
                return (someNumber%2 == 0) ? true : false;
            };

            var getCurrentMonthIndex = function(){
                return self.getNow().month();
            };

            self.getNow = function(){
                return moment();
            };

            self.isCurrentMonthTalkMonth = function(){
                //we internally only deal with index based months so January is 0.
                //That's why we need to adjust the value here
                var currentMonth = getCurrentMonthIndex() + 1;
                return hannoverJsMonth === 'odd' ? !isEven(currentMonth) : isEven(currentMonth);
            };

            self.getTalkDayOfMonth = function(month){
                var monthIndex = month -1;
                var weekOffset = hannoverJsRhythm - 1;

                var firstOfMonth = moment().date(1).month(monthIndex);

                var weekdayOfFirst = firstOfMonth
                                    .day();

                if (weekdayOfFirst === hannoverJsWeekday){
                    return firstOfMonth;
                }
                else if (weekdayOfFirst < hannoverJsWeekday){
                    return firstOfMonth
                                .add('d', hannoverJsWeekday - weekdayOfFirst)
                                .add('weeks', weekOffset);

                }
                else{
                    return firstOfMonth
                                .add('d', hannoverJsWeekday - weekdayOfFirst + 7)
                                .add('weeks', weekOffset);
                }
            };

            self.getNextTalkDate = function(){

                var talkDateInCurrentMonth = self.getTalkDayOfMonth(getCurrentMonthIndex() + 1);

                if (self.isCurrentMonthTalkMonth() && self.getNow().isBefore(talkDateInCurrentMonth)){
                    //we are in a talk month and it's before the date
                    return talkDateInCurrentMonth;
                }
                else if(self.isCurrentMonthTalkMonth()){
                    //we are in a talk month but it already happened, fast fotward two month
                    return self.getTalkDayOfMonth(getCurrentMonthIndex() + 2 + 1);
                }
                else{
                    //we are not in a talk month, fast forward one month
                    return self.getTalkDayOfMonth(getCurrentMonthIndex() + 1 + 1);
                }
            };

            return self;
       });

angular.module('hannoverjs')
       .controller('TalkDateController', ['$scope', 'dateService', function($scope, dateService){
            $scope.talkDate = dateService.getNextTalkDate().format('Do [of] MMMM');
       }]);

angular.module('hannoverjs')
       .controller('CurrentTalkController', ['dateService', '$location', function(dateService, $location){
            var nextTalk = dateService.getNextTalkDate();
            $location.path('talks/' + nextTalk.format('MM') + '/' + nextTalk.format('YYYY'));
       }]);

angular.module('hannoverjs')
       .controller('TalksController', ['$scope', '$http', '$routeParams', 'dateService', function($scope, $http, $routeParams, dateService){

            var nextTalk = dateService.getNextTalkDate();

            $scope.talkDate = nextTalk.format('Do [of] MMMM');
            
            //in case we are looking at an old talk, don't show the default header as it would confuse people
            //instead tell them, that they are looking at an old line up
            if (nextTalk.format('MMYYYY').toLowerCase() !== ($routeParams.month + $routeParams.year).toLowerCase()){
                $scope.talkHeaderTemplate = 'views/talks/talks_header_archive.tpl.html';
            }
            else{
                $scope.talkHeaderTemplate = 'views/talks/talks_header.tpl.html';
            }

            var actualTalkTemplate = '/views/talks/' + $routeParams.month + '_' + $routeParams.year + '.tpl.html';
            var defaultTalkTemplate = 'views/talks/default.tpl.html';

            //This could be improved so that we actually use the template that we fetch.
            //Currently we only fetch it to dertermine if it exists. If it exists, AngularJS will fetch it again
            $http
                .get(actualTalkTemplate)
                .success(function(){
                    $scope.templateUrl = actualTalkTemplate;
                })
                .error(function(){
                    $scope.templateUrl = defaultTalkTemplate;
                });
       }]);


