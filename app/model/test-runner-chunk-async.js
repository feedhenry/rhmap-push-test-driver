"use strict";

const TestRunner = require("./test-runner");
const forEachAsyncWithInterval = require("../util/for-each-async-interval");

/**
 * Single Requests Async in Chunks Test Runner
 * It sends all alias to the backend, split in chunks and with a fixed interval, to be notified individually and simultaneously.
 * The backend will iterate over each chunk with async.each() and send a request to each one.
 */
class TestRunnerChunksAsync extends TestRunner {

    constructor(args) {
        super(args);
        this.chunkSize = args.chunkSize;
    }

    start(aliases) {
        super.start();

        const chunks = this.splitAliasesInChunks(aliases);

        const startTime = Date.now();
        console.log(`Sending notifications to ${chunks.length} chunks of alias, with an interval of ${this.delay} ms.`);

        forEachAsyncWithInterval(chunks, chunk => {
            console.log(`Sending notification to ${chunk.length} aliases asynchronously after ${Date.now() - startTime} ms.`);
            this.api.notifyAliasesIndividually(chunk)
                .then(res => console.log(`RESPONSE: ${res.statusCode} - ${res.body.error || res.body}`))
                .catch(err => console.log(`ERROR: ${err}`));
        }, this.delay);
    }

    splitAliasesInChunks(aliases) {
        const totalChunks = Math.ceil(aliases.length / this.chunkSize);
        const chunks = [totalChunks];
        for (let i = 0; i < totalChunks; i++) {
            const begin = i * this.chunkSize;
            const end = begin + this.chunkSize;
            chunks[i] = aliases.slice(begin, end);
        }

        return chunks;
    }

}

module.exports = TestRunnerChunksAsync;
