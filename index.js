

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil'),
    parseUtil = require('./lib/parse.util');
module.exports = {
    /**
     * This return
     * @param {Request} req 
     * @returns {object}
     * @throws {Error} If WHERE clause cannot be parsed.
     *         @property {String} `code: 'E_WHERE_CLAUSE_UNPARSEABLE'`
     */
    getNativeCriteria(req) {
        var model = actionUtil.parseModel(req);
        var raw = JSON.stringify(actionUtil.parseCriteria(req));
        var modified = raw.replace('"or":', '"$or":').replace('">":', '"$gt":').replace('">=":', '"$gte":')
            .replace('"<":', '"$lt":').replace('"<=":', '"$lte":');
        var criteria = JSON.parse(modified);
        var attributes = model._attributes;

        _.forIn(criteria, function (value, key) {
            if (_.isArray(value)) {
                _.forEach(value, function (arrayValue, index) {
                    if(_.isString(arrayValue)){
                        criteria[key][index] = parseUtil(arrayValue, attributes[key]);
                    }else if(_.isObject(arrayValue)){
                        _.forIn(arrayValue, function (subValue, subKey) {
                            criteria[key][index][subKey] = parseUtil(subValue, attributes[subKey]);
                        });
                    }
                })
            } else {
                criteria[key] = parseUtil(criteria[key], attributes[key]);
            }
        });
        return criteria;
    }

}