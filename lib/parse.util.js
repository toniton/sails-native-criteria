/**
 * This return
 * @param {object} criteria 
 * @param {object} attribute 
 * @returns {object}
 * @throws {Error} If WHERE clause cannot be parsed.
 *         @property {String} `code: 'E_WHERE_CLAUSE_UNPARSEABLE'`
 */
module.exports = function (criteria, attribute) {
    if (
        !(_.has(attribute, 'type') || _.has(attribute, 'enum')
            || _.has(attribute, 'model') || _.has(attribute, 'collections')
            || _.isString(attribute))
    ) {
        throw new Error('Attribute `$key` does not have a type, please check your model definition.');
    }
    if (attribute.type == 'datetime') {
        if (_.isArray(criteria)) {
            var newArray = [];
            _.forEach(criteria, function (result) {
                newArray.push(new Date(result));
            })
            criteria = newArray;
        } else if (_.isObject(criteria)) {
            _.forIn(criteria, function (subValue, subKey) {
                if (_.isString(subValue)) {
                    criteria[subKey] = new Date(subValue);
                }
            });
        } else if (_.isString(criteria)) {
            criteria = new Date(value);
        }
    }
    return criteria;
}