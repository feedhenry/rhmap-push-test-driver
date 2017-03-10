"use strict";

const CommandLineParserBuilder = require("./util/command-line-parser-builder");
const TestRunnerBuilder = require("./util/test-runner-builder");
const TestRunnerController = require("./util/test-runner-controller");

const args = CommandLineParserBuilder.buildCommandLineParser();

const testRunners = new TestRunnerBuilder(args).buildTestRunners();

new TestRunnerController(args, testRunners)
    .start()
    .then(() => console.log("end?"));
