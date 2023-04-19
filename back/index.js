const express = require('express');
const app = express();
const usersRoutes = require('./routes/usersController');
const userRoutes = require('./routes/userController');
const discussionsRoutes = require('./routes/discussionsController');
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.use('/discussions', discussionsRoutes);
app.use('/users', usersRoutes.router);
app.use('/user', userRoutes);
app.listen(3000, () => {
	console.log('Server started on port 3000');
});
