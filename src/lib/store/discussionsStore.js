import axios from 'axios';
import { writable } from 'svelte/store';

export const discussions = writable();

export const getDiscussions = async () => {
	try {
		// Envoi de la requête POST à l'API avec le corps de la requête et l'en-tête
		const response = await axios.get('http://localhost:3000/discussions');

		// Affichage de la réponse de l'API
		discussions.set(response.data);
	} catch (error) {
		console.error(error);
	}
};

export const sendMessage = async (connectedUserId, userToChat, newMessage) => {
	try {
		// Envoi de la requête POST à l'API avec le corps de la requête et l'en-tête
		const response = await axios.post('http://localhost:3000/discussions/add', {
			connectedUserId: connectedUserId,
			userToChatId: userToChat.id,
			message: newMessage
		});

		// Affichage de la réponse de l'API
		discussions.set(response.data);
	} catch (error) {
		console.error(error);
	}
};
