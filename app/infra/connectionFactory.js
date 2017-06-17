var mysql = require('mysql');

function createDBConnection(){

    if(!process.env.NODE_ENV){
      return mysql.createConnection({
                  host:'localhost',
                  user:'root',
                  password:'senha123',
                  database:'casadocodigo_nodejs'
            });
    }

    if(process.env.NODE_ENV == 'test'){
      console.log('BANCO de TESTE!!');
        return mysql.createConnection({
                  host:'localhost',
                  user:'root',
                  password:'senha123',
                  database:'casadocodigo_nodejs_test'
            });
    }
}

module.exports = function(){
    return createDBConnection
}
