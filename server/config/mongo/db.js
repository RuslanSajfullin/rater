'use strict';

module.exports = {
    name: 'rest-api',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8081,
    db: {
        uri: 'mongodb://localhost:27017/rater',
        name: 'rater'
    }
};