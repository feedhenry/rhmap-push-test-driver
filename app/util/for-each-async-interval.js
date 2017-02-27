"use strict";

function forEachAsyncWithInterval(collection, func, interval) {
    collection.forEach((item, i) => {
        setTimeout(() => {
            func(item);
        }, interval * i);
    });
}

module.exports = forEachAsyncWithInterval;
