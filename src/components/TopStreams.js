import React, { useState, useEffect } from "react";
import api from "../api";

function TopStreams() {
	const [channels, setChannels] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await api.get("https://api.twitch.tv/helix/streams");
			console.log(response.data);
			let dataArray = response.data.data;
			let finalArray = dataArray.map(channel => {
				let newURL = channel.thumbnail_url
					.replace("{width}", "300")
					.replace("{height}", "300");
				channel.thumbnail_url = newURL;
				return channel;
			});

			setChannels(finalArray);
		};
		fetchData();
	}, []);

	return <div>Streams</div>;
}

export default TopStreams;
