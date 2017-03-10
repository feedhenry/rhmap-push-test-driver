"use strict";

const forEachAsyncWithInterval = require("../../app/util/for-each-async-interval");

describe("forEachAsyncWithInterval", () => {

    let timerCallback;

    beforeEach(() => {
        timerCallback = jasmine.createSpy("timerCallback");
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it("should apply the function on each item after each interval", () => {
        const collection = ["a", "b", "c"];
        const func = timerCallback;
        const interval = 100;

        forEachAsyncWithInterval(collection, func, interval);

        expect(timerCallback).not.toHaveBeenCalled();

        for (let i = 0; i < collection.length; i++) {
            jasmine.clock().tick(i * interval);
            expect(timerCallback.calls.count()).toEqual(i + 1);
        }
    });

});
