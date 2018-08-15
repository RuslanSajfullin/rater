//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../models/user');

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/app');
let should = chai.should();

chai.use(chaiHttp);
//Наш основной блок
describe('User', () => {
    //beforeEach((done) => { //Перед каждым тестом чистим базу
    //    Book.remove({}, (err) => {
    //        done();
    //    });
    //});
    /*
      * Тест для /GET
      */
    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(server).get('/users').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                //res.body.length.should.be.eql(0);
                done();
            });
        });
    });

});