import axios from 'axios';
import { writable } from 'svelte/store';
import { users } from './usersStore';

export const user = writable();
export const connected = writable(false);
export const toggleForm = writable('signIn');
export const friends = writable();

export const connect = async (userTryingToLog) => {
	try {
		// Envoi de la requête POST à l'API avec le corps de la requête et l'en-tête
		const response = await axios.post('http://localhost:3000/user/connect', userTryingToLog);

		// Affichage de la réponse de l'API
		user.set(response.data);
		connected.set(true);
	} catch (error) {
		console.error(error);
	}
};

export const getuser = async () => {
	try {
		// Envoi de la requête POST à l'API avec le corps de la requête et l'en-tête
		const response = await axios.post('http://localhost:3000/user');

		// Affichage de la réponse de l'API
		user.set(response.data);
	} catch (error) {
		console.error(error);
	}
};

export const addFriend = async (emailToAdd, useremail) => {
	try {
		// Envoi de la requête POST à l'API avec le corps de la requête et l'en-tête
		const response = await axios.post('http://localhost:3000/user/addfriend', {
			emailToAdd,
			useremail
		});

		// Affichage de la réponse de l'API
		users.set(response.data[0]);
		user.set(response.data[1]);
	} catch (error) {
		console.error(error);
	}
};
