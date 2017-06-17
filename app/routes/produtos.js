module.exports = function(app) {

  var listaProdutos = function(req, res) {

      var connection = app.infra.connectionFactory();
      var produtosDAO = new app.infra.ProdutosDAO(connection);

      produtosDAO.lista(function(erros,resultados, next){

        if(erros){
          return next(erros);
        }
          res.format({
            html: function(){
                res.render('produtos/lista',{lista:resultados});
            },
            json: function(){
                res.json(resultados);
            }
        });
        return;
      });

      connection.end();

  };
    app.get("/produtos",listaProdutos);

    app.get("/produtos/form", function(req, res) {
        res.render("produtos/form", {errosValidacao:{},produto:{}});

    });

    app.post("/produtos", function(req, res){

      req.assert('titulo', 'Titulo eh obrigatorio').notEmpty();
      req.assert('preco', 'Formato inválido! Ex: 100.40').isFloat();

      var erros = req.validationErrors();

      var produto = req.body;

      if(erros){
          res.format({
            html: function(){
                res.status(400).render('produtos/form',{errosValidacao:erros, produto:produto});
            },
            json: function(){
                res.status(400).json(erros);

            }
        });
        return;

      }
      console.log(produto);
      var connection = app.infra.connectionFactory();
      var produtosDAO = new app.infra.ProdutosDAO(connection);

      produtosDAO.salva(produto,function(erros,resultados){
          res.format({
            html: function(){
                  res.status(302).redirect('/produtos');
            },
            json: function(){
                res.status(302).json(resultados);
            }
        });
        return;
      });

      connection.end();

    });

}
