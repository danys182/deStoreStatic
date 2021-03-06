const express = require('express');
const routerApi = require('./routers/index');
const cors = require('cors');
const logger = require('./utils/winston.createLogger');

const {
	errorHandler,
	boomErrorHandler,
} = require('./middlewares/error.handles');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://myd.com/'];
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(boom.unauthorized());
		}
	},
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
	res.send('Inicio deStore');
});

routerApi(app);

//Middleswares manejo de errores
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
	logger.info('Corriendo');
});
