"use strict";

const async = require("async");
const CSVHelper = require("./csv-helper");

class TestRunnerController {

    constructor(args, testRunners) {
        this.args = args;
        this.testRunners = testRunners;
    }

    start() {
        return this.getAliasesFromCSV()
            .then(aliases => this.startTestRunnersAsync(aliases));
    }

    getAliasesFromCSV() {
        return new CSVHelper(this.args.csv).getAliasesFromCSV();
    }

    startTestRunnersAsync(aliases) {
        async.each(this.testRunners, testRunner => testRunner.start(aliases));
    }

}

module.exports = TestRunnerController;
