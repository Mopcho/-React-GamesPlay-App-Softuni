import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame } from 'services/api/games';

export const Create = () => {
	const navigate = useNavigate();

	const [gameData, setGameData] = useState({
		title: '',
		category: '',
		maxLevel: '',
		imageUrl: '',
		summary: '',
	});

	async function onCreate(ev) {
		ev.preventDefault();

		const token = sessionStorage.getItem('accessToken');

		const response = await createGame(gameData, token);

		if (response.code === 403) {
			return window.alert(response.message);
		}

		navigate(`/games/${response._id}`);
	}

	async function onChangeInput(ev) {
		const value = ev.target.value;
		const name = ev.target.name;

		const newGameData = {
			...gameData,
			[name]: value,
		};

		setGameData((gameData) => newGameData);
	}

	return (
		// <!-- Create Page ( Only for logged-in users ) -->
		<section id="create-page" className="auth">
			<form id="create" onSubmit={onCreate}>
				<div className="container">
					<h1>Create Game</h1>
					<label htmlFor="leg-title">Legendary title:</label>
					<input
						type="text"
						id="title"
						name="title"
						placeholder="Enter game title..."
						value={gameData.title}
						onChange={onChangeInput}
					/>

					<label htmlFor="category">Category:</label>
					<input
						type="text"
						id="category"
						name="category"
						placeholder="Enter game category..."
						value={gameData.category}
						onChange={onChangeInput}
					/>

					<label htmlFor="levels">MaxLevel:</label>
					<input
						type="number"
						id="maxLevel"
						name="maxLevel"
						min="1"
						placeholder="1"
						onChange={onChangeInput}
						value={gameData.maxLevel}
					/>

					<label htmlFor="game-img">Image:</label>
					<input
						type="text"
						id="imageUrl"
						name="imageUrl"
						placeholder="Upload a photo..."
						onChange={onChangeInput}
						value={gameData.imageUrl}
					/>

					<label htmlFor="summary">Summary:</label>
					<textarea
						name="summary"
						id="summary"
						onChange={onChangeInput}
						value={gameData.summary}
					></textarea>

					<input className="btn submit" type="submit" />
				</div>
			</form>
		</section>
	);
};
