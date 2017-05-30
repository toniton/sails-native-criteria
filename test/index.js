var should = require('chai').should(),
    scapegoat = require('../index'),
    convert = scapegoat.getNativeCriteria,
    sails = require('sails'),
    routerReq = require('sails/lib/router/req'),
    mixinReqParamsAll = require('sails/lib/hooks/request/params.all');

describe('Mongo Query', function () {

    describe('Check < changes to $lt', function () {
        it('should respond with a valid mongo query', function () {
            var sampleReq = routerReq({
                method: 'GET',
                url: '/test?where={"createdAt":{"<":"2017-05-26T20:46:52.459Z"}}',
                options: {
                    model: 'test'
                },
                _sails: sails
            });
            var expectedDate = new Date("2017-05-26T20:46:52.459Z");
            mixinReqParamsAll(sampleReq, null);
            convert(sampleReq).should.deep.equal({
                createdAt: {
                    $lt: expectedDate
                }
            });
        });
    });

    describe('Check <= changes to $lte', function () {
        it('should respond with a valid mongo query', function () {
            var sampleReq = routerReq({
                method: 'GET',
                url: '/test?where={"createdAt":{"<=":"2017-05-26T20:46:52.459Z"}}',
                options: {
                    model: 'test'
                },
                _sails: sails
            });
            var expectedDate = new Date("2017-05-26T20:46:52.459Z");
            mixinReqParamsAll(sampleReq, null);
            convert(sampleReq).should.deep.equal({
                createdAt: {
                    $lte: expectedDate
                }
            });
        });
    });

    describe('Check > changes to $gt', function () {
        it('should respond with a valid mongo query', function () {
            var sampleReq = routerReq({
                method: 'GET',
                url: '/test?where={"createdAt":{">":"2017-05-26T20:46:52.459Z"}}',
                options: {
                    model: 'test'
                },
                _sails: sails
            });
            var expectedDate = new Date("2017-05-26T20:46:52.459Z");
            mixinReqParamsAll(sampleReq, null);
            convert(sampleReq).should.deep.equal({
                createdAt: {
                    $gt: expectedDate
                }
            });
        });
    });

    describe('Check >= changes to $gte', function () {
        it('should respond with a valid mongo query', function () {
            var sampleReq = routerReq({
                method: 'GET',
                url: '/test?where={"createdAt":{">=":"2017-05-26T20:46:52.459Z"}}',
                options: {
                    model: 'test'
                },
                _sails: sails
            });
            var expectedDate = new Date("2017-05-26T20:46:52.459Z");
            mixinReqParamsAll(sampleReq, null);
            convert(sampleReq).should.deep.equal({
                createdAt: {
                    $gte: expectedDate
                }
            });
        });
    });

    describe('Check or changes to $or', function () {
        it('should respond with a valid mongo query', function () {
            var sampleReq = routerReq({
                method: 'GET',
                url: '/test?where={"or":[{"status":"pending"},{"createdAt":{">=":"2017-05-26T20:46:52.459Z"}}]}',
                options: {
                    model: 'test'
                },
                _sails: sails
            });
            var expectedDate = new Date("2017-05-26T20:46:52.459Z");
            mixinReqParamsAll(sampleReq, null);
            convert(sampleReq).should.deep.equal({
                $or: [
                    {
                        status: "pending"
                    },
                    {
                        createdAt: {
                            $gte: expectedDate
                        }
                    }
                ]
            });
        });
    });

    describe('Check for array in or', function () {
        it('should respond with a valid mongo query', function () {
            var sampleReq = routerReq({
                method: 'GET',
                url: '/test?where={"or":[{"status":["pending","completed"]},{"createdAt":{">=":"2017-05-26T20:46:52.459Z"}}]}',
                options: {
                    model: 'test'
                },
                _sails: sails
            });
            var expectedDate = new Date("2017-05-26T20:46:52.459Z");
            mixinReqParamsAll(sampleReq, null);
            convert(sampleReq).should.deep.equal({
                $or: [
                    {
                        status: ["pending", "completed"]
                    },
                    {
                        createdAt: {
                            $gte: expectedDate
                        }
                    }
                ]
            });
        });
    });

    describe('Check for array in or', function () {
        it('should respond with a valid mongo query', function () {
            var sampleReq = routerReq({
                method: 'GET',
                url: '/test?where={"createdAt":{">":"2017-04-30T08:36:31.973Z","<=":"2017-05-30T08:36:31.973Z"},"status":["active","paid"]}&skip=0',
                options: {
                    model: 'test'
                },
                _sails: sails
            });
            var expectedDate = new Date("2017-05-26T20:46:52.459Z");
            mixinReqParamsAll(sampleReq, null);
            convert(sampleReq).should.deep.equal({
                status: [
                    "active",
                    "paid"
                ],
                createdAt: {
                    "$gt": new Date('2017-04-30T08:36:31.973Z'),
                    "$lte": new Date('2017-05-30T08:36:31.973Z')
                }
            });
        });
    });

});

