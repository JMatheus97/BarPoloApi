const express = require('express');
const cors = require('cors');
const app = express();
const UserRoutes = require('./routes/configuracao/UserRoutes');
const TypeItemRoutes = require('./routes/configuracao/TypeItemRoutes');
const DetergenteRoutes = require('./routes/configuracao/DetergenteRoutes');
const EmblagemRoutes = require('./routes/configuracao/EmbalagemRoutes');
const EquipamentoRoutes = require('./routes/configuracao/EquipamentoRoutes');
const LocalizacaoRoutes = require('./routes/configuracao/LocalizacaoRoutes');
const ProcedimentoRoutes = require('./routes/configuracao/ProcedimentoRoutes');
const MaterialRoutes = require('./routes/configuracao/MaterialRoutes');
const ParametroRoutes = require('./routes/configuracao/ParametrosRoutes');
const CaixaRoutes = require('./routes/configuracao/CaixaRoutes');


//Config JSON response 
app.use(express.json());

//Solve Cors
app.use(cors({ credentials: true, origin:  'http://localhost:3000'}));

//Public folter for images
app.use(express.static('public'));

// Routes
app.use('/users', UserRoutes);
app.use('/typeItem', TypeItemRoutes);
app.use('/detergente', DetergenteRoutes);
app.use('/embalagem', EmblagemRoutes);
app.use('/equipamento', EquipamentoRoutes);
app.use('/localizacao', LocalizacaoRoutes);
app.use('/procedimento', ProcedimentoRoutes);
app.use('/material', MaterialRoutes);
app.use('/parametro', ParametroRoutes);
app.use('/caixa', CaixaRoutes);

app.listen(5000);



