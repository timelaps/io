var b = require('@timelaps/batterie');
var build = require('.');
var keys = require('@timelaps/n/keys');
var forOwn = require('@timelaps/n/for/own');
b.describe('build', function () {
    b.expect(build).toBeFunction();
    b.it('can create objects that are curried in a variety of ways', function (t) {
        var built = build('prefix', function () {});
        t.expect(built).toBeObject();
        t.expect(keys(built).sort()).toEqual(['prefix', 'call', 'callTry', 'callBound', 'callBoundTry'].sort());
    }, 2);
});