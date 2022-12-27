const express = require('express');
const cors = require('cors');
const app = express();
const MesaRoutes = require('./routes/MesaRoutes');
const UsuarioRoutes = require('./routes/UsuarioRoutes');



//Config JSON response 
app.use(express.json());

//Solve Cors
app.use(cors({ credentials: true, origin:  'http://localhost:3000'}));

//Public folter for images
app.use(express.static('public'));

// Routes
app.use('/users', UsuarioRoutes);
app.use('/mesa', MesaRoutes);

app.listen(5000);



