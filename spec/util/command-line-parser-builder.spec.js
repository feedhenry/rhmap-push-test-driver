"use strict";

const CommandLineParserBuilder = require("../../app/util/command-line-parser-builder");

describe("CommandLineParserBuilder", () => {

    describe(".checkArguments", () => {

        const args = {};
        const checkArguments = () => CommandLineParserBuilder.checkArguments(args);

        beforeEach(() => {
            args.endPoint = undefined;
            args.appId = undefined;
            args.csv = undefined;
            args.delay = "1000";
            args.instances = "1";
            args.batchMode = false;
            args.chunkSize = "0";
        });

        // Delay

        it("should pass if delay is a positive integer", () => {
            args.delay = "1";

            expect(checkArguments).toBeTruthy();
        });

        it("should throw if delay is a negative integer", () => {
            args.delay = "-1";

            expect(checkArguments).toThrowError("Delay (-d) must be a positive integer");
        });

        it("should throw if delay is 0", () => {
            args.delay = "0";

            expect(checkArguments).toThrowError("Delay (-d) must be a positive integer");
        });

        it("should throw if delay is not an integer", () => {
            args.delay = "foo";

            expect(checkArguments).toThrowError("Delay (-d) must be a positive integer");
        });

        // Instance

        it("should pass if instances is a positive integer", () => {
            args.instances = "1";

            expect(checkArguments).toBeTruthy();
        });

        it("should throw if instances is a negative integer", () => {
            args.instances = "-1";

            expect(checkArguments).toThrowError("Instances (-i) must be a positive integer");
        });

        it("should throw if instances is 0", () => {
            args.instances = "0";

            expect(checkArguments).toThrowError("Instances (-i) must be a positive integer");
        });

        it("should throw if instances is not an integer", () => {
            args.instances = "foo";

            expect(checkArguments).toThrowError("Instances (-i) must be a positive integer");
        });

        // ChunkSize

        it("should pass if chunkSize is a positive integer", () => {
            args.chunkSize = "1";

            expect(checkArguments).toBeTruthy();
        });

        it("should throw if chunkSize is a negative integer", () => {
            args.chunkSize = "-1";

            expect(checkArguments).toThrowError("ChunkSize (-s) must be a positive integer");
        });

        it("should pass if chunkSize is 0", () => {
            args.chunkSize = "0";

            expect(checkArguments).toBeTruthy();
        });

        it("should throw if chunkSize is not an integer", () => {
            args.chunkSize = "foo";

            expect(checkArguments).toThrowError("ChunkSize (-s) must be a positive integer");
        });

        // Others

        it("should pass if endPoint, appId and csv are provided", () => {
            args.endPoint = "endPoint";
            args.appId = "appId";
            args.csv = "csv";
            expect(checkArguments).toBeTruthy();
        });

        it("should throw if pushApplicationID, masterSecret and csv are not provided together", () => {
            args.endPoint = "endPoint";
            args.appId = undefined;
            args.csv = undefined;

            expect(checkArguments).toThrowError("Endpoint, AppId and CSV options are mandatory");

            args.endPoint = undefined;
            args.appId = "appId";
            args.csv = undefined;

            expect(checkArguments).toThrowError("Endpoint, AppId and CSV options are mandatory");

            args.endPoint = undefined;
            args.appId = undefined;
            args.csv = "csv";

            expect(checkArguments).toThrowError("Endpoint, AppId and CSV options are mandatory");
        });

    });

});
