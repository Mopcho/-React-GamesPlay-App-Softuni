import { Game } from 'components/game';
import { useEffect, useState } from 'react';
import { listGames } from 'services/api/games';

export const Catalogue = () => {
	const [games, setGames] = useState([]);

	useEffect(() => {
		listGames().then((games) => setGames(games));
	}, []);

	return (
		// <!-- Catalogue -->
		<section id="catalog-page">
			<h1>All Games</h1>
			{/* <!-- Display div: with information about every game (if any) --> */}
			{/* <!-- Display paragraph: If there is no games  -->s */}
			{games ? (
				games.map((game) => <Game key={game._id} {...game}></Game>)
			) : (
				<h3 className="no-articles">No articles yet</h3>
			)}
		</section>
	);
};
