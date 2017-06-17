
function ProdutosDAO(connection) {
    this._connection = connection;
}

ProdutosDAO.prototype.lista = function(callback) {
    this._connection.query('select * from livros',callback);
}
ProdutosDAO.prototype.salva = function(produto,callback) {
    this._connection.query('INSERT INTO livros SET ?', produto, callback);
}  

ProdutosDAO.prototype.carrega = function(id,callback){
  this._connection.query('select * from livros where id =' + id, callback);
}
ProdutosDAO.prototype.remove = function(livro, callback){
  this._connection.query('delete from livros where id='+ livro.id,callback);
}


module.exports = function(){
    return ProdutosDAO;
};
