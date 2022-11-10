const  Router  = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsMiddleware = require('./Dogs');
const temperMiddleware = require('./Temper');

const router = Router();


router.use(Router.json());
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs',dogsMiddleware);
router.use('/temperaments',temperMiddleware);


module.exports = router;
