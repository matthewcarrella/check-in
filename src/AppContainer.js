import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import App2 from "./App2";
import User from './User';
import MyNav from './components/Navbar';

function AppContainer() {
	return (
		<Router>
			<MyNav/>
			<Routes>
				<Route exact path="/" element={<User />} />
				<Route path="/about" element={<App2 />} />
				
			</Routes>
		</Router>
	);
}

export default AppContainer;
