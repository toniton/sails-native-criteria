<h1>
  <a href="http://sailsjs.org"><img alt="Sails.js logo" src="http://balderdashy.github.io/sails/images/logo.png" title="Sails.js"/></a>
</h1>

# sails-native-criteria
This is a sailsjs library that converts requests to a format that native mongodb understands.

### Get Started
This library helps you convert your sails query to a format that native mongodb understands. Hence you can directly pass your get request directly to your native mongodb $match stage or any other aggregation or native mongodb method that accepts a query.

### Installation
***With [node](http://nodejs.org) [installed](http://nodejs.org/en/download):***
```
npm i sails-native-criteria --save
```

### Usage
In your controller.

```Javascript
        //Controller method to sum total BOQ
        sum: function (req, res) {
            var nativeCriteria = require('sails-native-criteria');
            var criteria = nativeCriteria.getNativeCriteria(req);
            BOQ.native(function (err, collection) {
                collection.aggregate([
                    {
                        $match: criteria
                    },
                    {
                        $group: {
                            _id: null,
                            sum: { $sum: "$total" }
                        }
                    }
                ],
                    function (err, response) {
                        if (err) {
                            return res.forbidden(err);
                        }
                        if (response.length !== 1) {
                            return res.ok({ sum: 0 });
                        }
                        return res.ok({ sum: response[0].sum });
                    }
                )
            });
        }
```

Your url would look like this --> `/bog/sum?where={"createdAt":{"<":"2017-05-26T20:46:52.459Z"}}`
###### NB: skip, limit are also allowed.

### Feature Requests
If you have an idea for a new feature, please feel free to submit it as a pull request to this repository.

## Contributing
1. Fork it gently!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request :D
6. Your name shows up in credits

## Credits
* **Akinjiola Toni** *Toniton* [sails-datatables](https://github.com/toniton/sails-datatables)

## License
[MIT License](LICENSE.md) Copyright © 2016
