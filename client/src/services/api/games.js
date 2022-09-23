const root = 'http://localhost:3030/data/games';

export async function listGames() {
	const gamesRaw = await fetch(`${root}?sortBy=_createdOn%20desc`, {
		method: 'GET',
	});

	const games = await gamesRaw.json();

	return games;
}

export async function getGame(id) {
	const gameRaw = await fetch(`${root}/${id}`, {
		method: 'GET',
	});

	const game = await gameRaw.json();

	return game;
}

export async function createGame(data, token) {
	const responseRaw = await fetch(`${root}`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': token,
		},
	});

	const response = await responseRaw.json();

	return response;
}

export async function deleteGame(id, token) {
	const responseRaw = await fetch(`${root}/${id}`, {
		method: 'DELETE',
		headers: {
			'X-Authorization': token,
		},
	});

	const response = await responseRaw.json();

	return response;
}

export async function editGame(id, token, data) {
	const responseRaw = await fetch(`${root}/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': token,
		},
	});

	const response = await responseRaw.json();

	return response;
}
