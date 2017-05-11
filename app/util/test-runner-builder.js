"use strict";

const TestRunnerSingleAsync = require("../model/test-runner-single-async");
const TestRunnerChunksAsync = require("../model/test-runner-chunk-async");
const TestRunnerBatch = require("../model/test-runner-batch");
const TestRunnerSingleVariant = require("../model/test-runner-single-variant");

class TestRunnerBuilder {

    constructor(args) {
        this.args = args;
    }

    buildTestRunners() {
        const testRunnerType = this.getTestRunnerType(this.args);

        const testRunners = [];

        for (let i = 0; i < this.args.instances; i++) {
            testRunners[i] = new testRunnerType(this.args);
        }

        return testRunners;
    }

    getTestRunnerType() {
        if (this.args.variant) {
            return TestRunnerSingleVariant;
        } else if (this.args.batchMode) {
            return TestRunnerBatch;
        } else if (this.args.chunkSize > 0) {
            return TestRunnerChunksAsync;
        } else {
            return TestRunnerSingleAsync;
        }
    }

}

module.exports = TestRunnerBuilder;
