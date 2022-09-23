export async function setAccessToken(token) {
	sessionStorage.setItem('accessToken', token);
}

export async function getAccessToken() {
	const accessToken = sessionStorage.getItem('accessToken');

	return accessToken;
}

export async function clearAccessToken() {
	const accessToken = sessionStorage.removeItem('accessToken');
}
