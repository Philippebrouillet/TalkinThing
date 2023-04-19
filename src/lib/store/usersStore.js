import axios from 'axios';
import { writable } from 'svelte/store';

export const users = writable();

export const getUsers = async () => {
	try {
		// Envoi de la requête POST à l'API avec le corps de la requête et l'en-tête
		const response = await axios.get('http://localhost:3000/users');

		// Affichage de la réponse de l'API
		users.set(response.data);
	} catch (error) {
		console.error(error);
	}
};

export const addNewUser = async (newUser) => {
	try {
		const response = await axios.post('http://localhost:3000/users/addnewuser', newUser);

		users.set(response.data);
	} catch (error) {
		console.error(error);
	}
};
