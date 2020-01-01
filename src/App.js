import React from "react";

import { Route, Switch, Link } from "react-router-dom";

import Header from "./components/Header";
import Games from "./components/Games";
import Streams from "./components/Streams";
import GameStreams from "./components/GameStreams";
import TopGameCategory from "./TopGameCategory";

import "./App.css";

function App() {
	return (
		<div>
			<Header />
			<Route exact path='/' component={Games} />
			<Route exact path='/top-streams' component={Streams} />
			<Route exact path='/game/:id' component={GameStreams} />
		</div>
	);
}

export default App;
