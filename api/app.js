const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const { checkApiKey } = require('./middlewares/auth.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Configuración de CORS
const whitelist = new Set(['http://localhost:3000']);
const options = {
  origin: (origin, callback) => {
    if (whitelist.has(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed.'));
    }
  }
};
app.use(cors(options));

//Auth
require('./utils/auth');

// Rutas principales
app.get('/api', checkApiKey, (req, res) => {
  res.send('API v1');
});

// Registrar rutas
routerApi(app);

// Middlewares de manejo de errores
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Iniciar servidor
app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err.message}`);
  } else {
    console.log(`Listening at http://localhost:${port}`);
  }
});
