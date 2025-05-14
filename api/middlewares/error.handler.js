const { ValidationError } = require('sequelize');

function logErrors (err, req, res, next) {
  next(err);
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    // Eliminar la propiedad 'instance' de cada error en el array 'errors'
    if (Array.isArray(err.errors)) {
      err.errors.forEach(error => {
        delete error.instance;
      });
    }

    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  } else {
    next(err);
  }
}

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function errorHandler (err, req, res, next) {
  const response = {
    message: err.message,
  };
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }
  res.status(err.status || 500).json(response);
}



module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
