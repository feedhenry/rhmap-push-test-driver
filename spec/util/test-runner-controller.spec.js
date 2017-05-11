"use strict";

const TestRunnerController = require("../../app/util/test-runner-controller");
const TestRunnerSingleAsync = require("../../app/model/test-runner-single-async");
const TestRunnerChunksAsync = require("../../app/model/test-runner-chunk-async");
const TestRunnerBatch = require("../../app/model/test-runner-batch");

describe("TestRunnerController", () => {

    const args = {};

    const testRunners = [];

    const controller = new TestRunnerController(args, testRunners);

    beforeEach(() => {
        testRunners.length = 0;
    });

    describe(".start", () => {

        const aliases = ["alias1", "alias2"];

        beforeAll(() => {
            spyOn(controller, "getAliasesFromCSV").and.returnValue(new Promise((res, rej) => res(aliases)));
        });

        beforeEach(() => {
            args.endPoint = "endPoint";
            args.appId = "appId";
            args.csv = "csv";

            spyOn(controller, "startTestRunnersAsync");
        });

        it("should call getAliasesFromCSV if csv argument is defined", () => {
            const count = controller.getAliasesFromCSV.calls.count();
            controller.start()
                .then(() => expect(controller.getAliasesFromCSV.calls.count()).toBe(count + 1))
                .catch(err => fail(err));
        });

        it("should not call getAliasesFromCSV if csv argument is undefined", () => {
            args.csv = undefined;
            const count = controller.getAliasesFromCSV.calls.count();

            controller.start()
                .then(() => expect(controller.getAliasesFromCSV.calls.count()).toBe(count))
                .catch(err => fail(err));
        });

        it("should call startTestRunnersAsync", () => {
            controller.start()
                .then(() => expect(controller.startTestRunnersAsync).toHaveBeenCalled())
                .catch(err => fail(err));
        });

        it("should run startTestRunnersAsync with alias if type is TestRunnerSingleAsync", () => {
            testRunners.push(new TestRunnerSingleAsync(args));

            controller.start()
                .then(() => expect(controller.startTestRunnersAsync).toHaveBeenCalledWith(aliases))
                .catch(err => fail(err));
        });

        it("should run startTestRunnersAsync with alias if type is TestRunnerChunksAsync", () => {
            testRunners.push(new TestRunnerChunksAsync(args));

            controller.start()
                .then(() => expect(controller.startTestRunnersAsync).toHaveBeenCalledWith(aliases))
                .catch(err => fail(err));
        });

        it("should run startTestRunnersAsync with alias if type is TestRunnerBatch", () => {
            testRunners.push(new TestRunnerBatch(args));

            controller.start()
                .then(() => expect(controller.startTestRunnersAsync).toHaveBeenCalledWith(aliases))
                .catch(err => fail(err));
        });

    });

});
