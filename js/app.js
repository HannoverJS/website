'use strict';

// Declare app level module which depends on filters, and services
angular.module('hannoverjs', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'views/home.tpl.html', controller: 'TalksController'});
    $routeProvider.when('/speakers', {templateUrl: 'views/speaker.tpl.html'});
    $routeProvider.when('/talks/:month/:year', {template: '<div ng-include="templateUrl"></div>', controller: 'TalksController'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

angular.module('hannoverjs')
       .service('timeService', function(){
            var self = {};

            self.getNow = function(){
                return moment();
            };

            return self;
       });

angular.module('hannoverjs')
       .service('dateService', ['timeService', function(timeService){
            var self = {};

            var hannoverJsMonth = 'odd',
                hannoverJsWeekday = 4,
                //can be either 1, 2, 3 or 4 (e.g first, second, third or fourth Weekday of Month)
                hannoverJsRhythm = 4;

            var isEven = function(someNumber){
                return (someNumber%2 == 0) ? true : false;
            };

            var getCurrentMonthIndex = function(){
                return timeService.getNow().month();
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

                var firstOfMonth = timeService.getNow().date(1).month(monthIndex);

                var weekdayOfFirst = firstOfMonth
                                    .day();

                if (weekdayOfFirst <= hannoverJsWeekday){
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

                var talkDateInCurrentMonth = self
                                                .getTalkDayOfMonth(getCurrentMonthIndex() + 1)
                                                .hour(23)
                                                .minute(59)
                                                .second(59)
                                                .millisecond(999);


                if (self.isCurrentMonthTalkMonth() && timeService.getNow().isBefore(talkDateInCurrentMonth)){
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
       }]);

angular.module('hannoverjs')
       .controller('TalksController', ['$scope', '$location', '$http', '$routeParams', 'dateService', function($scope, $location, $http, $routeParams, dateService){

            var nextTalk = dateService.getNextTalkDate();

            $scope.talkDate = nextTalk.format('Do [of] MMMM');

            var month = $routeParams.month || nextTalk.format('MM'),
                year = $routeParams.year   || nextTalk.format('YYYY');
            
            // in case we are looking at an old talk, don't show the default header as it would confuse people
            // instead tell them, that they are looking at an old line up
            if (nextTalk.format('MMYYYY').toLowerCase() !== (month + year).toLowerCase()){
                $scope.talkHeaderTemplate = 'views/talks/talks_header_archive.tpl.html';
            }
            else{
                $scope.talkHeaderTemplate = 'views/talks/talks_header.tpl.html';
            }

            var actualTalkTemplate = 'views/talks/' + month + '_' + year + '.tpl.html';
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


