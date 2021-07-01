const colors = require('colors/safe');

import mongoose, { ConnectionOptions } from 'mongoose';
import config from './config';

(async () => {
	try {
		const mongooseOptions: ConnectionOptions = {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			/* user: config.MONGO_USER,
			pass: config.MONGO_PASSWORD, */
		};
		const db = await mongoose.connect(
			`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`,
			mongooseOptions
		);
		console.log('database is connected to:', colors.yellow(db.connection.name));
	} catch (error) {
		console.error(error);
	}
})();
