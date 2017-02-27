"use strict";

const TestRunner = require("./test-runner");

/**
 * Multiple Request Simultaneously Test Runner
 * It sends all alias to the backend, that will notify them simultaneously using the "batch" feature, using a single request.
 */
class TestRunnerBatch extends TestRunner {

    constructor(args) {
        super(args);
    }

    start(aliases) {
        super.start();

        console.log(`Sending notification to ${aliases.length} aliases in a single batch`);

        this.api.notifyAliasesUsingBatchFeature(aliases)
            .then(res => console.log(`RESPONSE: ${res.statusCode} - ${res.body.error || res.body}`))
            .catch(err => console.log(`ERROR: ${err}`));
    }

}

module.exports = TestRunnerBatch;
