"use strict";

const TestRunner = require("./test-runner");

/**
 * Variants Test Runner
 * It sends a request to the backend with a list of variants that will be notified.
 */
class TestRunnerVariants extends TestRunner {

    constructor(args) {
        super(args);
        this.variants = args.variants;
    }

    start() {
        super.start();

        console.log(`Sending notifications to variants: ${this.variants.toString()}`);

        this.api.notifyVariants(this.variants)
            .then(res => console.log(`[${this.variants.toString()}] RESPONSE: ${res.statusCode} - ${res.body.error || res.body}`))
            .catch(err => console.log(`[${this.variants.toString()}] ERROR: ${err}`));
    }

}

module.exports = TestRunnerVariants;
