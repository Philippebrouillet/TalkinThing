const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const users = require('./usersController');

const userConnect = [];
router.post('/connect', (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	const user = users.users.find((user) => user.email === email);

	bcrypt.compare(password, user.password, (err, result) => {
		if (err) {
			console.error(err);
			return res.status(500).send('Erreur serveur');
		}
		if (!result) {
			// Le mot de passe est incorrect
			return res.status(401).send('Mot de passe incorrect');
		}
		// Le mot de passe est correct
		userConnect.push(user);
		return res.json(user);
	});
});

router.get('/', (req, res) => {
	return res.json(userConnect);
});

router.post('/addfriend', (req, res) => {
	let emailUser = req.body.useremail;
	let emailFriend = req.body.emailToAdd;

	let newFriend = users.users.find((user) => user.email === emailFriend);
	let user = users.users.find((user) => user.email === emailUser);
	let userIndex = users.users.findIndex((user) => user.email === emailUser);
	let newFriendIndex = users.users.findIndex((user) => user.email === emailFriend);
	console.log(newFriend);

	users.users[userIndex].friends.push(newFriend.id);
	users.users[newFriendIndex].friends.push(user.id);

	res.json([users.users, user]);
});
module.exports = router;
