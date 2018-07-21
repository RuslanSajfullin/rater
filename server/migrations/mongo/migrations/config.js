'use strict';
const config  = require('../../../config/mongo/config');
// In this file you can configure migrate-mongo

module.exports = {

    mongodb: {
        url: config.db.uri,

        databaseName: config.db.name,

        options: {
            useNewUrlParser: true, // removes a deprecation warning when connecting
            //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
            //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
        }
    },

    // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
    migrationsDir: 'migrations',

    // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
    changelogCollectionName: 'changelog',

};