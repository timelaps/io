var doTry = require('@timelaps/fn/do-try'),
    CALL = 'call',
    BOUND = 'Bound',
    TRY = 'Try',
    CALL_BOUND = CALL + BOUND,
    CALL_TRY = CALL + TRY,
    CALL_BOUND_TRY = CALL + BOUND + TRY;
module.exports = buildCallers;

function buildCallers(methodName, handler, second, memo_) {
    var memo = memo_ || {},
        call = memo[CALL] = memo[CALL] || {},
        callTry = memo[CALL_TRY] = memo[CALL_TRY] || {},
        callBound = memo[CALL_BOUND] = memo[CALL_BOUND] || {},
        callBoundTry = memo[CALL_BOUND_TRY] = memo[CALL_BOUND_TRY] || {};
    memo[methodName] = handler;
    call[methodName] = function (array, method, arg) {
        return handler(array, function (item) {
            return item[method](arg);
        });
    };
    callBound[methodName] = function (array, arg) {
        return handler(array, function (fn) {
            return fn(arg);
        });
    };
    callTry[methodName] = function (array, method, arg, catcher, finallyer) {
        return handler(array, doTry(function (item) {
            return item[method](arg);
        }, catcher, finallyer));
    };
    callBoundTry[methodName] = function (array, method, arg, catcher, finallyer) {
        return handler(array, doTry(function (item) {
            return item(arg);
        }, catcher, finallyer));
    };
    if (second) {
        buildCallers(methodName + 'Right', second, null, memo);
    }
    return memo;
}