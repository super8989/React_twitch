import React, { useState, useEffect } from "react";
import api from "../api";

function TopStreams() {
	const [channels, setChannels] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			//fetch top streams
			const response = await api.get("https://api.twitch.tv/helix/streams");
			let dataArray = response.data.data;
			// console.log(response.data.data);

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
			// console.log(gameNamesArray);

			let finalArray = dataArray.map(stream => {
				stream.gameName = "";
				gameNamesArray.map(name => {
					if (stream.game_id === name.id) {
						return (stream.gameName = name.name);
					}
				});
				// console.log(stream.gameName);

				let newURL = stream.thumbnail_url
					.replace("{width}", "440")
					.replace("{height}", "248");
				stream.thumbnail_url = newURL;
				return stream;
			});

			setChannels(finalArray);
		};
		fetchData();
	}, []);

	console.log(channels);

	return (
		<div>
			<h1>Most Popular Live Streams</h1>
			<div className='row'>
				{channels.map(channel => (
					<div className='col-lg-3 col-md-4 col-sm-6 mt-5' key={channel.id}>
						<div className='card'>
							<img className='card-img-top' src={channel.thumbnail_url} />
							<div className='card-body'>
								<h3 className='card-title'>{channel.user_name}</h3>
								<h5 className='card-text'>{channel.gameName}</h5>
								<div className='card-text'>
									{channel.viewer_count} live viewers
								</div>
								<button className='btn btn-success'>
									<a
										href={`https://twitch.tv/${channel.user_name}`}
										className='link'
										target='_blank'
									>
										Watch {channel.user_name}'s stream
									</a>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default TopStreams;
