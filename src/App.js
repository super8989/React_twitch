import React from "react";

import { Route } from "react-router-dom";

import Header from "./components/Header";
import TopGames from "./components/TopGames";
import TopStreams from "./components/TopStreams";
import GameStreams from "./components/GameStreams";

import "./App.css";

function App() {
	return (
		<div>
			<Header />
			<Route exact path='/' component={TopGames} />
			<Route exact path='/top-streams' component={TopStreams} />
			<Route exact path='/game/:id' component={GameStreams} />
		</div>
	);
}

export default App;
