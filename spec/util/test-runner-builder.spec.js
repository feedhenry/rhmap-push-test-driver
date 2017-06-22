"use strict";

const TestRunnerBuilder = require("../../app/util/test-runner-builder");
const TestRunnerSingleAsync = require("../../app/model/test-runner-single-async");
const TestRunnerChunksAsync = require("../../app/model/test-runner-chunk-async");
const TestRunnerBatch = require("../../app/model/test-runner-batch");
const TestRunnerSingleVariant = require("../../app/model/test-runner-variants");
const TestRunner = require("../../app/model/test-runner");

describe("TestRunnerBuilder", () => {

    const args = {
        endPoint: "endPoint",
        appId: "appId",
        csv: "csv"
    };
    const testRunnerBuilder = new TestRunnerBuilder(args);

    beforeEach(() => {
        args.batchMode = false;
        args.chunkSize = "0";
    });

    describe(".getTestRunnerType", () => {

        const getTestRunnerType = () => testRunnerBuilder.getTestRunnerType();

        it("should return TestRunnerSingleAsync type if batchMode or chunkSize is not passed", () => {
            args.batchMode = false;
            args.chunkSize = "0";

            const Type = getTestRunnerType();

            expect(new Type(args)).toEqual(jasmine.any(TestRunnerSingleAsync));
        });

        it("should return TestRunnerBatch type if batchMode is enabled", () => {
            args.batchMode = true;

            const Type = getTestRunnerType();

            expect(new Type(args)).toEqual(jasmine.any(TestRunnerBatch));
        });

        it("should return TestRunnerChunksAsync type if chunkSize is passed", () => {
            args.chunkSize = "10";

            const Type = getTestRunnerType();

            expect(new Type(args)).toEqual(jasmine.any(TestRunnerChunksAsync));
        });

        it("should return TestRunnerSingleVariant type if variant is passed", () => {
            args.variants = "variant";

            const Type = getTestRunnerType();

            expect(new Type(args)).toEqual(jasmine.any(TestRunnerSingleVariant));
        });

    });

    describe(".buildTestRunners", () => {

        it("should create an array", () => {
            const testRunners = testRunnerBuilder.buildTestRunners();

            expect(Array.isArray(testRunners)).toBeTruthy();
        });

        it("should create an array with as many TestRunner as 'instances' value", () => {
            const instances = 3;
            args.instances = instances;
            const testRunners = testRunnerBuilder.buildTestRunners();

            expect(testRunners.length).toBe(instances);
            expect(testRunners.every(tR => tR instanceof TestRunner)).toBeTruthy();
        });

    });

});
