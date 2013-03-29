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
    $routeProvider.when('/talks', {templateUrl: 'views/talks.tpl.html', controller: 'TalkDateController'});
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