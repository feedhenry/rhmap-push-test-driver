"use strict";

const TestRunnerController = require("../../app/util/test-runner-controller");
const TestRunnerSingleAsync = require("../../app/model/test-runner-single-async");
const TestRunnerChunksAsync = require("../../app/model/test-runner-chunk-async");
const TestRunnerBatch = require("../../app/model/test-runner-batch");

describe("TestRunnerController", () => {

    const args = {
        endPoint: "endPoint",
        appId: "appId",
        csv: "csv"
    };

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
            spyOn(controller, "startTestRunnersAsync");
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
