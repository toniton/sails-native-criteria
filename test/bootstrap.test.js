var sails = require('sails'),
    wolfpack = require('wolfpack');

before(function (done) {
    this.timeout(10000);
    sails.lift({
        port: '6060',
        models: {
            connection: 'localDiskDb',
            migrate: 'drop'
        }
    }, function (err) {
        if (err) return done(err);
        
        sails.models['test'] = wolfpack({
            attributes: {
                name: {
                    type: 'string'
                },
                amount: {
                    type: 'float'
                },
                status: {
                    enum: ['pending','completed']
                }
            }
        });
        done(err, sails);
    });
});

after(function (done) {
    sails.lower(done);
});