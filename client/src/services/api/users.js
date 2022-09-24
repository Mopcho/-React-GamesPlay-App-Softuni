import { setAccessToken } from 'utils/userToken';

const root = 'http://localhost:3030/users';

export async function registerUser(data) {
	const responseRaw = await fetch(`${root}/register`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const response = await responseRaw.json();

	setAccessToken(response.accessToken);

	return response;
}

export async function loginUser(data) {
	const responseRaw = await fetch(`${root}/login`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const response = await responseRaw.json();

	if (response.code === 403) {
		return response;
	}

	setAccessToken(response.accessToken);

	return response;
}

export async function getUser(token) {
	const responseRaw = await fetch(`${root}/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': token,
		},
	});

	const response = await responseRaw.json();

	if (response.code === 403) {
		return response;
	}

	return response;
}
