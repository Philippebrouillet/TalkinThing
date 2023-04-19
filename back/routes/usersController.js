const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const a = bcrypt.hashSync('a', 10);
const users = [
	{
		id: '3232329',
		friends: ['2323', '22213'],
		name: 'Paul',
		email: 'paul@hotmail.fr',
		password: a,
		img: 'https://source.unsplash.com/_7LbC5J-jw4/600x600'
	},
	{
		id: '2323',
		email: 'sarah@hotmail.fr',
		password: a,
		name: 'Sarah',
		friends: ['3232329', '22213'],
		img: 'https://tse3.mm.bing.net/th?id=OIP.pEkLWF-z9tVLHedSqMFLhgAAAA&pid=Api&P=0'
	},
	{
		id: '22213',
		name: 'Jérome',
		email: 'jerome@hotmail.fr',
		password: a,
		friends: [],
		img: 'https://tse4.mm.bing.net/th?id=OIP.hLTThhxHPeGqFQVjpD1-hwHaE8&pid=Api&P=0'
	},
	{
		id: '32313',
		name: 'Patrick',
		email: 'patrick@hotmail.fr',
		password: a,
		friends: [],
		img: 'https://tse2.mm.bing.net/th?id=OIP.0hB8NgnBaLcFBKs8JrZQJQHaHa&pid=Api&P=0'
	},
	{
		id: '23232323',
		name: 'Gael',
		email: 'gael@hotmail.fr',
		password: a,
		friends: [],
		img: 'https://tse3.explicit.bing.net/th?id=OIP.HGB7jxxwLWcmjrlhWwgbKgHaEK&pid=Api&P=0'
	},
	{
		id: '3214232',
		name: 'Ortence',
		email: 'ortence@hotmail.fr',
		password: a,
		friends: [],
		img: 'https://tse4.explicit.bing.net/th?id=OIP.O7jKb_qQ-QoPHtEJqqOQzgHaHa&pid=Api&P=0'
	},
	{
		id: '54232',
		name: 'Golum',
		email: 'golum@hotmail.fr',
		password: a,
		friends: [],
		img: 'https://tse4.mm.bing.net/th?id=OIP.7djVqIYptooFYQUtY1JS1gHaFj&pid=Api&P=0'
	},
	{
		id: '542312',
		name: 'Benji',
		email: 'benji@hotmail.fr',
		password: a,
		friends: [],
		img: 'https://tse2.mm.bing.net/th?id=OIP._3tky5k8yZds2RNX0p8oFgHaEo&pid=Api&P=0'
	}
];

router.get('/', async (req, res) => {
	return res.json(users);
});

router.post('/addnewuser', async (req, res) => {
	const verif = users.filter((user) => user.email === req.body.email);

	if (verif.length === 0) {
		// Générer une version hashée du mot de passe
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const uniqueId = uuidv4();
		// Ajouter le nouvel utilisateur avec le mot de passe hashé
		users.push({
			id: uniqueId,
			img: '',
			friends: [],
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword
		});
	} else {
		console.log('utilisateur déjà éxistant');
	}

	return res.json(users);
});

module.exports = { router, users };
