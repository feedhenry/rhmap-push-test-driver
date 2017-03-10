"use strict";

const fs = require("fs");
const CSVHelper = require("../../app/util/csv-helper");

describe("CSVHelper", () => {

    describe(".getAliasesFromCSV", () => {

        const path = "./csv-helper-spec-temp.csv";

        beforeAll(() => {
            let data = `#VARIANT ID,TOKEN ALIAS,TOKEN ID`;
            data += `\n`;
            data += `data1,foo1,data1`;
            data += `\n`;
            data += `data2,foo2,data2`;
            data += `\n`;
            data += `data3,foo3,data3`;

            fs.writeFileSync(path, data);
        });

        afterAll(() => {
            fs.unlinkSync(path);
        });

        it("should return an array of alias from a CSV with headers and commas", done => {
            new CSVHelper(path)
                .getAliasesFromCSV()
                .then(aliases => {
                    expect(Array.isArray(aliases)).toBeTruthy();
                    expect(aliases.length).toBe(3);
                    aliases.every(alias => expect(alias).toContain("foo"));
                    done();
                })
                .catch(err => {
                    fail(err);
                    done();
                });
        });

    });

});
