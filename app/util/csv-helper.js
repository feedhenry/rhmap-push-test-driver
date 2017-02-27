"use strict";

const csv = require("fast-csv");
const fs = require("fs");

class CSVHelper {

    constructor(csvPath) {
        this.csvPath = csvPath;
    }

    getAliasesFromCSV() {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(this.csvPath);
            const options = {
                headers: ["variantId", "alias", "token"],
                renameHeaders: true
            };
            const aliases = [];
            const csvStream = csv
                .parse(options)
                .on("data", row => aliases.push(row.alias))
                .on("error", err => reject(err))
                .on("end", () => resolve(aliases));

            stream.pipe(csvStream);
        });
    }

}

module.exports = CSVHelper;
