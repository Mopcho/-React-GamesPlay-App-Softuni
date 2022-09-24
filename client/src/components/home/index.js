import { Game } from 'components/game';
import { LatestGame } from 'components/latestGame';
import { useEffect, useState } from 'react';
import { getLatestGames } from 'services/api/games';

export const Home = () => {
	let [latestGames, setLatestGames] = useState([]);

	useEffect(() => {
		getLatestGames().then((games) =>
			setLatestGames((latestGames) => games)
		);
	}, []);

	return (
		// <!--Home Page-->
		<section id="welcome-world">
			<div className="welcome-message">
				<h2>ALL new games are</h2>
				<h3>Only in GamesPlay</h3>
			</div>
			<img src="./images/four_slider_img01.png" alt="hero" />

			<div id="home-page">
				<h1>Latest Games</h1>

				{/* <!-- Display div: with information about every game (if any) --> */}
				{latestGames.map((game) => (
					<LatestGame {...game}></LatestGame>
				))}

				{/* <!-- Display paragraph: If there is no games  --> */}
				{/* <p className="no-articles">No games yet</p> */}
			</div>
		</section>
	);
};
