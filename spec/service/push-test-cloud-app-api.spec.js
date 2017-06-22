"use strict";

const API = require("../../app/service/push-test-cloud-app-api");

describe("UPSAPI", () => {

    const args = {};

    let api;

    beforeEach(() => {
        args.endPoint = "";
        args.appId = undefined;
        args.direct = undefined;

        api = null;
    });

    it("should build the url correctly if set with final slash", () => {
        const aliases = undefined;
        args.endPoint = "http://localhost:5678/";

        api = new API(args);
        spyOn(api, "post");

        const url = `${api.baseUrl}/${api.pushRoute}/${api.appId}/alias`;

        api.notifyAliasesIndividually(aliases);
        expect(api.post).toHaveBeenCalledWith(url, aliases);
    });

    it("should build the url correctly if set without final slash", () => {
        const aliases = undefined;
        args.endPoint = "http://localhost:5678/";

        api = new API(args);
        spyOn(api, "post");

        const url = `${api.baseUrl}/${api.pushRoute}/${api.appId}/alias`;

        api.notifyAliasesIndividually(aliases);
        expect(api.post).toHaveBeenCalledWith(url, aliases);
    });

    describe(".notifyAlias", () => {

        it("should return a promise with the result", done => {
            args.endPoint = "http://localhost:1234/";

            api = new API(args);
            spyOn(api, "get").and.returnValue(new Promise((res, rej) => res("ok")));

            api.notifyAlias("alias").then(res => {
                expect(res).not.toBeUndefined();
                done();
            });
        });

    });

    describe(".notifyAliasesIndividually", () => {

        it("should return a promise with the result", done => {
            args.endPoint = "http://localhost:1234/";

            api = new API(args);
            spyOn(api, "post").and.returnValue(new Promise((res, rej) => res("ok")));

            api.notifyAliasesIndividually([]).then(res => {
                expect(res).not.toBeUndefined();
                done();
            });
        });

    });

    describe(".notifyAliasesUsingBatchFeature", () => {

        it("should return a promise with the result", done => {
            args.endPoint = "http://localhost:1234/";

            api = new API(args);
            spyOn(api, "post").and.returnValue(new Promise((res, rej) => res("ok")));

            api.notifyAliasesUsingBatchFeature([]).then(res => {
                expect(res).not.toBeUndefined();
                done();
            });
        });

    });

    describe(".notifyVariant", () => {

        it("should return a promise with the result", done => {
            args.endPoint = "http://localhost:1234/";

            api = new API(args);
            spyOn(api, "get").and.returnValue(new Promise((res, rej) => res("ok")));

            api.notifyVariant("variant").then(res => {
                expect(res).not.toBeUndefined();
                done();
            });
        });

    });

});
