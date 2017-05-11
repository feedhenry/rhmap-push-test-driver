"use strict";

const request = require("request");

const PUSH_ROUTE_FHPUSH = "push/fh";
const PUSH_ROUTE_UPS_API = "push/ups";

class PushTestCloudAppAPI {

    constructor(args) {
        this.appId = args.appId;
        this.endPoint = args.endPoint;
        this.direct = args.direct;
    }

    set endPoint(endPoint) {
        this.baseUrl = endPoint.lastIndexOf('/') === endPoint.length - 1
            ? endPoint.slice(0, -1)
            : endPoint;
    }

    set direct(direct) {
        this.pushRoute = direct
            ? PUSH_ROUTE_UPS_API
            : PUSH_ROUTE_FHPUSH;
    }

    notifyAlias(alias) {
        const url = `${this.baseUrl}/${this.pushRoute}/${this.appId}/${alias}`;

        return this.get(url);
    }

    notifyAliasesIndividually(aliases) {
        const url = `${this.baseUrl}/${this.pushRoute}/${this.appId}`;

        return this.post(url, aliases);
    }

    notifyAliasesUsingBatchFeature(aliases) {
        const url = `${this.baseUrl}/${this.pushRoute}/${this.appId}/batch`;

        return this.post(url, aliases);
    }

    notifyVariant(variant) {
        const url = `${this.baseUrl}/${this.pushRoute}/${this.appId}/variants/${variant}`;

        return this.get(url);
    }

    get(url) {
        return new Promise((resolve, reject) => {
            const callback = (err, res) => err ? reject(err) : resolve(res);

            request
                .get(url, callback);
        });
    }

    post(url, body) {
        return new Promise((resolve, reject) => {
            const callback = (err, res) => err ? reject(err) : resolve(res);

            request
                .post(url, callback)
                .json(body);
        });
    }

}

module.exports = PushTestCloudAppAPI;
