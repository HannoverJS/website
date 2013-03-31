var dateService;
var dateFormat = 'YYYY-MM-DD';

QUnit.testStart(function(){
    var $injector = angular.injector([ 'ng', 'hannoverjs']);
    dateService = $injector.get('dateService');
});

test('detects March as talk month', function(){

    dateService.getNow = function(){
        return moment('2012-03-15');
    };

    ok(dateService.isCurrentMonthTalkMonth(), 'detects month as talk month');
});

test('detects April as non-talk month', function(){

    dateService.getNow = function(){
        return moment('2012-04-15');
    };

    ok(!dateService.isCurrentMonthTalkMonth(), 'detects month as non-talk month');
});

test('in March 2013, before talk date, detects 2013-03-28 as talk date', function(){

    dateService.getNow = function(){
        return moment('2013-03-15');
    };

    var talkDate = dateService.getNextTalkDate().format(dateFormat);
    ok(talkDate === '2013-03-28', 'detects correct talk date');
});

test('in March 2013, on talk date, detects 2013-03-28 as talk date', function(){

    dateService.getNow = function(){
        return moment('2013-03-28');
    };

    var talkDate = dateService.getNextTalkDate().format(dateFormat);
    ok(talkDate === '2013-03-28', 'detects correct talk date');
});

test('in March 2013, after talk date, detects 2013-05-23 as talk date', function(){

    dateService.getNow = function(){
        return moment('2013-03-29');
    };

    var talkDate = dateService.getNextTalkDate().format(dateFormat);
    ok(talkDate === '2013-05-23', 'detects correct talk date');
});

test('in April 2013, detects 2013-05-23 as talk date', function(){

    dateService.getNow = function(){
        return moment('2013-04-10');
    };

    var talkDate = dateService.getNextTalkDate().format(dateFormat);
    ok(talkDate === '2013-05-23', 'detects correct talk date');
});

test('in December 2013, detects 2014-01-23 as talk date', function(){

    dateService.getNow = function(){
        return moment('2013-12-10');
    };

    var talkDate = dateService.getNextTalkDate().format(dateFormat);
    ok(talkDate === '2014-01-23', 'detects correct talk date');
});

test('on 1st December 2012 (Thursday), detects 2012-11-22 as talk date', function(){

    dateService.getNow = function(){
        return moment('2012-11-01');
    };

    var talkDate = dateService.getNextTalkDate().format(dateFormat);
    ok(talkDate === '2012-11-22', 'detects correct talk date');
});