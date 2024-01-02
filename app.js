// Importar módulo express 
const express = require('express');

//importar módulo express-handlebars
const { engine } = require('express-handlebars'); 

//importar módulo postgres
const { Pool } = require('pg');

// Criar uma instância do express
const app = express();

//adicionar bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))

//adicionar css
app.use('/css',express.static('./css'));

//configuração do express-handlebars
app.engine('handlebars', engine());
app.set('view engine','handlebars');
app.set('views', './views');

//Manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Configuração de conexão com o PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'projeto',
  password: '123',
  port: 5432, // Porta padrão do PostgreSQL
});

// Rota de exemplo
app.get('/', async (req, res) => {
  try {
    // Exemplo de consulta
    const result = await pool.query('SELECT NOW()');
    res.render("formulario")
  } catch (error) {
    console.error('Erro na consulta ao PostgreSQL:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Iniciar o servidor
const porta = 3000;
app.listen(porta, () => {
  console.log(`Servidor está ouvindo na porta ${porta}`);
});


//Rota Principal
app.get('/', function(req, res) {
    res.render('formulario');
  });

  //Rota de cadastro
  app.post('/cadastrar',function(req,res){
      console.log(req.body);
  });

//Servidor
 app.listen(8080);