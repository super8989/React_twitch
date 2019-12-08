import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [topGames, setTopGames] = useState([]);

	useEffect(() => {
		getTwitch();
	}, []);

	console.log(topGames);

	async function getTwitch() {
		try {
			const response = await axios.get(
				"https://api.twitch.tv/helix/games/top",
				{
					headers: { "Client-ID": "mt5146rna7y3m6wlfvy2yvtq8matpa" }
				}
			);
			setTopGames(response.data.data);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}

	const _boxArt = url =>
		url.replace("{width}", "300").replace("{height}", "400");

	return (
		<div className='App'>
			{topGames.map(game => (
				<div key={game.id}>
					<h1>{game.name}</h1>
					<img src={_boxArt(game.box_art_url)} alt={game.name} />
				</div>
			))}
		</div>
	);
}

export default App;
