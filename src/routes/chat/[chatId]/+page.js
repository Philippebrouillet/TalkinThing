export const load = ({ fetch, params }) => {
	const userChatId = JSON.parse(params.chatId);

	const fetchChatUsers = async () => {
		const res = await fetch(`http://localhost:3000/users`);
		const data = await res.json();
		return data;
	};
	//const userchat = JSON.parse(params.chatId);
	return {
		users: fetchChatUsers(),
		id: userChatId.id
	};
};
