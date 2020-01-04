import React, { useState, useEffect } from "react";
import api from "../api";

function TopStreams() {
	const [channels, setChannels] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			//fetch top streams
			const response = await api.get("https://api.twitch.tv/helix/streams");
			let dataArray = response.data.data;
			console.log(response.data.data);

			// array of game ids
			let gameID = dataArray.map(stream => {
				return stream.game_id;
			});
			// console.log(gameID);

			let baseURL = `https://api.twitch.tv/helix/games?`;
			let queryParams = "";
			gameID.map(id => {
				return (queryParams = queryParams + `id=${id}&`);
			});

			//finalURL of all the game ids appended
			let finalURL = baseURL + queryParams;
			// console.log(finalURL);

			// second api call to get game information by game id
			let gameNames = await api.get(finalURL);
			// console.log(gameNames);

			//array of game information
			let gameNamesArray = gameNames.data.data;
			console.log(gameNamesArray);

			let finalArray = dataArray.map(stream => {
				stream.gameName = "";
				gameNamesArray.map(name => {
					if (stream.game_id === name.id) {
						return (stream.gameName = name.name);
					}
				});
				console.log(stream.gameName);
			});

			// setChannels(finalArray);
		};
		fetchData();
	}, []);

	return <div>Streams</div>;
}

export default TopStreams;
