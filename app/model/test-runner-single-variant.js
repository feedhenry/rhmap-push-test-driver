"use strict";

const TestRunner = require("./test-runner");

/**
 * Single Variant Test Runner
 * It sends a request to the backend.
 */
class TestRunnerSingleVariant extends TestRunner {

    constructor(args) {
        super(args);
        this.variant = args.variant;
    }

    start() {
        super.start();

        console.log(`Sending notifications to variant: ${this.variant}`);

        this.api.notifyVariant(this.variant)
            .then(res => console.log(`[${this.variant}] RESPONSE: ${res.statusCode} - ${res.body.error || res.body}`))
            .catch(err => console.log(`[${this.variant}] ERROR: ${err}`));
    }

}

module.exports = TestRunnerSingleVariant;
