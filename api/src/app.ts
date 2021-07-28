import express from 'express';
import morgan from 'morgan'; // registro de peticiones en el servidor
import cors from 'cors'; // permite conexion con otros servidores

import config from './config';

import kwRoutes from './routes/keyWord.routes';
import acRoutes from './routes/asinsConfirmed.routes';
import asinsRoutes from './routes/asins.routes';

const app = express();

app.set('port', config.PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // para entender los campos que vienen en la url

app.use(kwRoutes);
app.use(acRoutes);
app.use(asinsRoutes);

export default app;
