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


    if(process.env.NODE_ENV == 'production') {
        console.log('Bonco Remoto - OK');
        return mysql.createConnection({
                host: 'us-cdbr-iron-east-03.cleardb.net',
                user: 'b5c21c2d00f2a5',
                password: '93a491ba',
                database:  'heroku_d5c943cb58e9a05'
        });
    }
}

module.exports = function(){
    return createDBConnection
}
