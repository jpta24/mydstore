const colors = require('colors/safe');

import app from './app';
import './database';

app.listen(app.get('port'), () => {
	console.log(colors.green('Server on port '), colors.red(app.get('port')));
});
