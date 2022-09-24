import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
	deleteGame,
	getComments,
	getGame,
	postComment,
} from 'services/api/games';
import { getUser } from 'services/api/users';
import { getAccessToken } from 'utils/userToken';

export const Details = ({ user, setUser }) => {
	const navigate = useNavigate();
	let { id } = useParams();
	let [game, setGame] = useState({});
	let [comments, setComments] = useState([]);
	let [formComment, setFormComment] = useState('');

	/**
	 * 1. Sets game
	 * 2. Sets comments
	 * 3. Tries to set user if any
	 */
	useEffect(() => {
		async function func() {
			const game = await getGame(id);
			setGame(game);

			const comments = await getComments(id);
			setComments(comments);

			const token = await getAccessToken();
			if (token) {
				const user = await getUser(token);
				setUser(user);
			}
		}

		func();
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

	async function onComment(ev) {
		ev.preventDefault();

		const token = await getAccessToken();
		const data = {
			comment: formComment,
			gameId: id,
		};

		const response = await postComment(token, data);
		setComments((comments) => [...comments, response]);
	}

	function onChange(ev) {
		const value = ev.target.value;

		setFormComment(value);
	}

	console.log(user);
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
						{comments.length > 0 ? (
							comments.map((comment) => (
								<li key={comment._id} className="comment">
									<p>{comment.comment}</p>
								</li>
							))
						) : (
							<p className="no-comment">No comments.</p>
						)}
						{/* <!-- list all comments for current game (If any) --> */}
					</ul>
					{/* <!-- Display paragraph: If there are no games in the database --> */}
				</div>

				{/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
				{user._id === game._ownerId ? (
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
				) : null}
			</div>

			{/* <!-- Bonus --> */}
			{/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
			{user._id !== game._ownerId && Object.keys(user).length !== 0 ? (
				<article className="create-comment">
					<label>Add new comment:</label>
					<form className="form" onSubmit={onComment}>
						<textarea
							name="comment"
							placeholder="Comment......"
							onChange={onChange}
							value={formComment}
						></textarea>
						<input
							className="btn submit"
							type="submit"
							value="Add Comment"
						/>
					</form>
				</article>
			) : null}
		</section>
	);
};
