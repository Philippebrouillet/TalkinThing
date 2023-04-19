const express = require('express');
const router = express.Router();

const discussions = [
	{ id: 1, timestamp: new Date().getTime(), messages: [{ id: 1, text: 'alo' }] }
];

router.get('/', async (req, res) => {
	return res.json(discussions);
});

router.post('/add', (req, res) => {
	let chatId = req.body.userToChatId + req.body.connectedUserId;
	let chatId2 = req.body.connectedUserId + req.body.userToChatId;

	let date = new Date().getTime();
	let newDiscussion = {
		id: chatId,
		messages: []
	};

	//if discussion.id !== connectedUserId+userToChat.id - add to discussions array newDiscussion
	//else discussion.id === connectedUserId+userToChat.id - add to discussions array newMessage

	const discussionIndex = discussions.findIndex(
		(discussion) => discussion.id === chatId || discussion.id === chatId2
	);

	if (discussionIndex === -1) {
		newDiscussion.messages.push({
			id: req.body.connectedUserId,
			text: req.body.message.text,
			read: false,
			timestamp: date
		});

		discussions.push(newDiscussion);
	} else {
		discussions[discussionIndex].messages.push({
			id: req.body.connectedUserId,
			text: req.body.message.text,
			read: false,
			timestamp: date
		});
	}

	// Envoi d'une réponse JSON avec le tableau de tâches mis à jour
	res.json(discussions);
});

router.delete('/delete', (req, res) => {
	const index = discussions.findIndex((todo) => todo.id === req.body.id);
	if (index !== -1) {
		discussions.splice(index, 1);
	}
	return res.json(discussions);
});

module.exports = router;
