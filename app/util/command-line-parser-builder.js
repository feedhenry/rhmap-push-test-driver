"use strict";

const args = require("yargs");

const DEFAULT_DELAY = 6500;
const DEFAULT_CHUNK_SIZE = 0;
const DEFAULT_INSTANCES = 1;

class CommandLineParserBuilder {
    static buildCommandLineParser() {
        return args
            .usage("Usage: node index.js [options]")
            .example("$0 -e http://example.com/backend -a asdf12134 -c ./devices.csv -d 5000", "")
            .example("$0 -e http://example.com/backend -a asdf12134 -c ./devices.csv -b -i 10", "")
            .example("$0 -e http://example.com/backend -a asdf12134 -c ./devices.csv -s 100 -D", "")
            .example("$0 -e http://example.com/backend -a asdf12134 -v variant1 -D", "")
            .example("$0 -e http://example.com/backend -a asdf12134 -v variant1 variant2 variant3", "")

            .alias("e", "endPoint")
            .nargs("e", 1)
            .describe("e", "The cloud app endpoint url")

            .alias("a", "appId")
            .nargs("a", 1)
            .describe("a", "The ID of the target application")

            .alias("c", "csv")
            .nargs("c", 1)
            .describe("c", "The path to the CSV path containing the alias in format 'variants;alias;tokenId'")

            .alias("d", "delay")
            .nargs("d", 1)
            .default("d", DEFAULT_DELAY)
            .describe("d", "The delay between each request")

            .alias("s", "chunkSize")
            .nargs("s", 1)
            .default("s", DEFAULT_CHUNK_SIZE)
            .describe("s", "The number of alias to be sent in separated chunks. Incompatible with --batchMode option.")

            .alias("i", "instances")
            .nargs("i", 1)
            .default("i", DEFAULT_INSTANCES)
            .describe("i", "How many test runners will be instantiated simultaneously")

            .alias("D", "direct")
            .boolean("D")
            .default("D", false)
            .describe("D", "Wether the UPS Sender API will be use (true) or the fh.push SDK (false)")

            .alias("b", "batchMode")
            .boolean("b")
            .default("b", false)
            .describe("b", "Whether or not the notifications will be sent using the 'batch' feature. Incompatible with --chunkSize option.")

            .alias("v", "variants")
            .array("v")
            .default("v", undefined)
            .describe("v", "A list of variant IDs that will receive the notification. Incompatible with --chunkSize, --batchMode and --csv options.")

            .check(this.checkArguments)

            .help("h")
            .alias("h", "help")
            .argv;
    }

    static checkArguments(args) {
        if (!parseInt(args.delay) || parseInt(args.delay) <= 0) {
            throw new Error("Delay (-d) must be a positive integer");
        }

        if (!args.endPoint || !args.appId) {
            throw new Error("Endpoint and AppId options are mandatory");
        }

        if (!parseInt(args.instances) || parseInt(args.instances) <= 0) {
            throw new Error("Instances (-i) must be a positive integer");
        }

        if (!parseInt(args.chunkSize) && parseInt(args.chunkSize) !== 0 || parseInt(args.chunkSize) < 0) {
            throw new Error("ChunkSize (-s) must be a positive integer");
        }

        if (args.chunkSize > 0 && args.batchMode) {
            throw new Error("BatchMode (-b) and ChunkSize (-s) cannot be together.");
        }

        if (args.chunkSize > 0 && args.variants
            || args.batchMode && args.variants
            || args.csv && args.variants) {
            throw new Error("BatchMode (-b), csv (-c) and ChunkSize (-s) cannot be with Variant (-v).");
        }

        if (!args.csv && !args.variants) {
            throw new Error("Either a list of aliases or a variants must be specified");
        }

        if (args.variants && !Array.isArray(args.variants)) {
            throw new Error("variants (-v) must be a list of ids");
        }

        return true;
    }

}

module.exports = CommandLineParserBuilder;
