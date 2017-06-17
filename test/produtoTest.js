var express = require('../config/express')();
var request = require('supertest')(express);
describe('#ProdutosController2',function(){

      beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        conn.query("delete from livros", function(ex,result){
            if(!ex) {
                done();
            }
        });
    });
    it('#listagem json2',function(done){
        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200,done);
    });



    it('#Cadastro de produtos invalidos',function(done){
        request.post('/produtos')
        .send({titulo:"", descricao:"Teste Invalido",preco:100.00})
        .expect(400,done);
    });

    it('#Cadastro de produtos válidos',function(done){
        request.post('/produtos')
        //.set('Accept','application/json')
        .send({titulo:"Livro Node JS", descricao:"Teste Valido",preco:100.00})
        .expect(302,done);
    });
});
