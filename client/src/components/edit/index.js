import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editGame, getGame } from 'services/api/games';
import { getAccessToken } from 'utils/userToken';

export const Edit = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const [formData, setFormData] = useState({
		category: '',
		title: '',
		maxLevel: '',
		imageUrl: '',
		summary: '',
	});

	useEffect(() => {
		getGame(id).then(({ category, title, maxLevel, imageUrl, summary }) => {
			let newForm = {
				category,
				title,
				maxLevel,
				imageUrl,
				summary,
			};

			setFormData((formData) => newForm);
		});
	}, [id]);

	function onChange(ev) {
		const name = ev.target.name;
		const value = ev.target.value;

		const newForm = {
			...formData,
			[name]: value,
		};

		setFormData((formData) => newForm);
	}

	async function onSubmite(ev) {
		ev.preventDefault();

		const token = await getAccessToken();
		const response = await editGame(id, token, formData);

		if (response.code === 403) {
			return window.alert('You are not authorized');
		}

		navigate(`/games/${id}`);
	}
	return (
		// <!-- Edit Page ( Only for the creator )-->
		<section id="edit-page" className="auth">
			<form id="edit" onSubmit={onSubmite}>
				<div className="container">
					<h1>Edit Game</h1>
					<label htmlFor="leg-title">Legendary title:</label>
					<input
						type="text"
						id="title"
						name="title"
						value={formData.title}
						onChange={onChange}
					/>

					<label htmlFor="category">Category:</label>
					<input
						type="text"
						id="category"
						name="category"
						value={formData.category}
						onChange={onChange}
					/>

					<label htmlFor="levels">MaxLevel:</label>
					<input
						type="number"
						id="maxLevel"
						name="maxLevel"
						min="1"
						value={formData.maxLevel}
						onChange={onChange}
					/>

					<label htmlFor="game-img">Image:</label>
					<input
						type="text"
						id="imageUrl"
						name="imageUrl"
						value={formData.imageUrl}
						onChange={onChange}
					/>

					<label htmlFor="summary">Summary:</label>
					<textarea
						name="summary"
						id="summary"
						onChange={onChange}
						value={formData.summary}
					></textarea>
					<input
						className="btn submit"
						type="submit"
						value="Edit Game"
					/>
				</div>
			</form>
		</section>
	);
};
