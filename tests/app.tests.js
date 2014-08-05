var dateService,
    timeService,
    dateFormat = 'YYYY-MM-DD';

//a mocked timeService that let's us easily set the date, that is used when asking for getNow()
angular.module('hannoverjs')
       .service('timeService', function timeServiceMock(){
            var self = {};

            self.setNow = function(date){
                self.getNow = function(){
                    return moment(date);
                };
            };

            self.getNow = function(){
                return moment();
            }

            return self;
       });

QUnit.testStart(function(){
    var $injector = angular.injector([ 'ng', 'hannoverjs']);
    dateService = $injector.get('dateService');
    timeService = $injector.get('timeService');
});

test('in March 2013, before talk date, detects 2013-03-28 as talk date', function(){
    timeService.setNow('2013-03-15');
    var talkDate = dateService.getNextTalkDate().format(dateFormat);
    ok(talkDate === '2013-03-28', 'detects correct talk date');
});

test('in March 2013, on talk date, detects 2013-03-28 as talk date', function(){
    timeService.setNow('2013-03-28');
    var talkDate = dateService.getNextTalkDate().format(dateFormat);
    ok(talkDate === '2013-03-28', 'detects correct talk date');
});

test('in March 2013, after talk date, detects 2013-04-25 as talk date', function(){
    timeService.setNow('2013-03-29');
    var talkDate = dateService.getNextTalkDate().format(dateFormat);
    ok(talkDate === '2013-04-25', 'detects correct talk date');
});

test('in April 2013, detects 2013-04-25 as talk date', function(){
    timeService.setNow('2013-04-10');
    var talkDate = dateService.getNextTalkDate().format(dateFormat);
    ok(talkDate === '2013-04-25', 'detects correct talk date');
});

test('in December 2013, detects 2014-01-23 as talk date', function(){
    timeService.setNow('2013-12-30');
    var talkDate = dateService.getNextTalkDate().format(dateFormat);
    ok(talkDate === '2014-01-23', 'detects correct talk date');
});

test('on 1st December 2012 (Thursday), detects 2012-11-22 as talk date', function(){
    timeService.setNow('2012-11-01');
    var talkDate = dateService.getNextTalkDate().format(dateFormat);
    ok(talkDate === '2012-11-22', 'detects correct talk date');
});

