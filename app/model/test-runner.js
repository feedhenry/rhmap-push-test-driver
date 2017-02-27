"use strict";

const API = require("../service/push-test-cloud-app-api");

class TestRunner {

    constructor(args) {
        this.api = new API(args);
        this.delay = args.delay;
    }

    start() {
    }
}

module.exports = TestRunner;
