import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Games() {
	const [games, setGames] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await api.get("https://api.twitch.tv/helix/games/top");
			console.log(response.data);
			let dataArray = response.data.data;
			let finalArray = dataArray.map(game => {
				let newURL = game.box_art_url
					.replace("{width}", "300")
					.replace("{height}", "400");
				game.box_art_url = newURL;
				return game;
			});
			setGames(finalArray);
		};
		fetchData();
	}, []);

	return (
		<div>
			<h1>Most Popular Games</h1>
			<div className='row'>
				{games.map(game => (
					<div
						className='col-xl-2 col-lg-3 col-md-4 col-sm-6 mt-5'
						key={game.id}
					>
						<div className='card'>
							<img
								className='card-img-top'
								src={game.box_art_url}
								alt={game.name}
							/>
							<div className='card-body'>
								<h6 className='card-title'>{game.name}</h6>
								<button className='btn btn-success'>
									<Link
										key={game.id}
										className='link'
										to={{
											pathname: `game/${game.name}`,
											state: {
												gameID: game.id
											}
										}}
									>
										{game.name} streams{" "}
									</Link>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Games;
