// requirements
const dotenv = require('dotenv').config();
const databaseAuthenticate = require('./src/Libraries/databaseAuthenticate');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// front-end compilado (produção): a própria API entrega as páginas, num serviço só.
// Precisa vir antes da verificação de login, que bloqueia qualquer requisição sem userID.
const frontDir = path.resolve(__dirname, process.env.FRONT_DIR || '../app/dist');
if (fs.existsSync(path.join(frontDir, 'index.html'))) {
    app.use(express.static(frontDir));
    app.use((req, res, next) => {
        if (req.method !== 'GET') return next();
        res.sendFile(path.join(frontDir, 'index.html'));
    });
}

// routes
app.use(require('./src/Middlewares/Users/LoginVerification'));
app.use('/users', require('./src/Routes/users'));
app.use('/accounts', require('./src/Routes/accounts'));
app.use('/transactions', require('./src/Routes/transaction'));

// server
// Em hospedagens como o Railway a porta vem em PORT
app.listen(process.env.PORT || process.env.API_PORT, process.env.API_HOST || '0.0.0.0', async () => {
    await databaseAuthenticate()
    console.log('=========Server Online==========');
    console.log('Acesse http://localhost:5173');
});
