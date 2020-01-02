import React, { useState, useEffect } from "react";

import api from "../api";

function GameStreams({ match, location }) {
	const [streamData, setStreamData] = useState([]);
	const [viewers, setViewers] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const response = await api.get(
				`https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`
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

			let totalViewers = finalArray.reduce((acc, val) => {
				return acc + val.viewer_count;
			}, 0);

			setViewers(totalViewers);
			setStreamData(finalArray);
		};
		fetchData();
	}, []);

	return (
		<div>
			<h1 className='text-center'>{match.params.id} Streams </h1>
			<h4 className='text-center'>
				<strong className='text-primary'>{viewers}</strong> people currenlty
				watching {match.params.id}
			</h4>
			<div className='row'>
				{streamData.map(stream => (
					<div
						className='col-xl-2 col-lg-3 col-md-4 col-sm-6 mt-5'
						key={stream.id}
					>
						<div className='card'>
							<img
								className='card-img-top'
								src={stream.thumbnail_url}
								alt={stream.user_name}
							/>
							<div className='card-body'>
								<h5 className='card-title'>{stream.user_name}</h5>
								<div className='card-text'>
									{stream.viewer_count} liver viewers
								</div>
								<button className='btn btn-success'>
									<a
										className='link'
										href={`https://twitch.tv/${stream.user_name}`}
										target='_blank'
									>
										Watch {stream.user_name}'s channel
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

export default GameStreams;
