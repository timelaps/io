var keys = require('@timelaps/n/keys');
var values = require('@timelaps/n/values');
var blockWrapper = require('@timelaps/fn/block-wrapper');
var isFunction = require('@timelaps/is/function');
var unwrapBlock = require('@timelaps/fn/unwrap-block');
module.exports = function evaluate(string_, context, args) {
    var fn, fnstring, string = string_,
        keyz = keys(args),
        valuz = values(args);
    if (isFunction(string_)) {
        string = unwrapBlock(string_);
    }
    fnstring = blockWrapper('"use strict";\nreturn (function(' + keyz.join(', ') + ') {' + (string || '') + '}.apply(this, __args__))');
    fn = new Function.constructor('__args__', fnstring);
    return fn.call(context, valuz);
};