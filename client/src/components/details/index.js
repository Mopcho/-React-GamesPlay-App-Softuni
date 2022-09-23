import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { deleteGame, getGame } from 'services/api/games';
import { getAccessToken } from 'utils/userToken';

export const Details = () => {
	const navigate = useNavigate();
	let { id } = useParams();
	const [game, setGame] = useState({});

	useEffect(() => {
		getGame(id).then((game) => setGame(game));
	}, [id]);

	async function onDelete(ev) {
		ev.preventDefault();
		if (window.confirm(`Do you really want to delete ${game.title}`)) {
			const token = await getAccessToken();
			const response = await deleteGame(id, token);
			if (response.code === 403) {
				return window.alert('You cant delete this!');
			}
			navigate('/catalogue');
		}
	}

	return (
		// <!--Details Page-->
		<section id="game-details">
			<h1>Game Details</h1>
			<div className="info-section">
				<div className="game-header">
					<img className="game-img" src={game.imageUrl} />
					<h1>{game.title}</h1>
					<span className="levels">{game.maxLevel}</span>
					<p className="type">{game.category}</p>
				</div>

				<p className="text">{game.summary}</p>

				{/* <!-- Bonus ( for Guests and Users ) --> */}
				<div className="details-comments">
					<h2>Comments:</h2>
					<ul>
						{/* <!-- list all comments for current game (If any) --> */}
						<li className="comment">
							<p>Content: I rate this one quite highly.</p>
						</li>
						<li className="comment">
							<p>Content: The best game.</p>
						</li>
					</ul>
					{/* <!-- Display paragraph: If there are no games in the database --> */}
					<p className="no-comment">No comments.</p>
				</div>

				{/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
				<div className="buttons">
					<NavLink
						to={{
							pathname: `/edit/${game._id}`,
							state: { ...game },
						}}
						className="button"
					>
						Edit
					</NavLink>
					<a className="button" onClick={onDelete}>
						Delete
					</a>
				</div>
			</div>

			{/* <!-- Bonus --> */}
			{/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
			<article className="create-comment">
				<label>Add new comment:</label>
				<form className="form">
					<textarea
						name="comment"
						placeholder="Comment......"
					></textarea>
					<input
						className="btn submit"
						type="submit"
						value="Add Comment"
					/>
				</form>
			</article>
		</section>
	);
};
