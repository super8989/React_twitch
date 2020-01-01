import React from "react";

import { Route, Switch, Link } from "react-router-dom";

import Header from "./components/Header";
import Games from "./components/Games";
import TopGameCategory from "./TopGameCategory";

import "./App.css";

function App() {
	return (
		<div>
			<Header />
			<Route exact path='/' component={Games} />
		</div>
	);
}

export default App;
