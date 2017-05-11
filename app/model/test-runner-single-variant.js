"use strict";

const TestRunner = require("./test-runner");

/**
 * Single Variant Test Runner
 * It sends a request to the backend.
 */
class TestRunnerSingleVariant extends TestRunner {

    constructor(args) {
        super(args);
        this.variantId = args.variantId;
    }

    start() {
        super.start();

        console.log(`Sending notifications to variant: ${this.variantId}`);

        this.api.notifyVariant(this.variantId)
            .then(res => console.log(`[${this.variantId}] RESPONSE: ${res.statusCode} - ${res.body.error || res.body}`))
            .catch(err => console.log(`[${this.variantId}] ERROR: ${err}`));
    }

}

module.exports = TestRunnerSingleVariant;
