const express = require('express');
const cors = require('cors');
const app = express();
const MesaRoutes = require('./routes/MesaRoutes');
const UsuarioRoutes = require('./routes/UsuarioRoutes');
const ProdutoRoutes = require('./routes/ProdutoRoutes');
const EstoqueRoutes = require('./routes/EstoqueRoutes');
const ComandaRoutes = require('./routes/ComandaRoutes');





// Routes
app.use('/usuario', UsuarioRoutes);
app.use('/mesa', MesaRoutes);
app.use('/produto', ProdutoRoutes);
app.use('/estoque', EstoqueRoutes);
app.use('/comanda', ComandaRoutes);


app.listen(5000);



