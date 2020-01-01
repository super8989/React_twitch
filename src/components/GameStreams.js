import React, { useState, useEffect } from "react";

import api from "../api";

function GameStreams({ match, location }) {
	const [streamData, setStreamData] = useState([]);
	const [viewers, setViewers] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const response = await api.get(
				`https://api.twitch.tv/helix/streams?game_id${location.state.gameID}`
			);
			console.log(response.data);
			let dataArray = response.data.data;
			let finalArray = dataArray.map(stream => {
				let newURL = stream.thumbnail_url
					.replace("{width}", "300")
					.replace("{height}", "300");
				stream.thumbnail_url = newURL;
				return stream;
			});
			setStreamData(finalArray);
		};
		fetchData();
	}, []);

	return (
		<div>
			<li>{match.params.id}</li>
			<li>{location.state.gameID}</li>
			<div>
				{streamData.map(stream => (
					<img src={stream.thumbnail_url} />
				))}
			</div>
		</div>
	);
}

export default GameStreams;
