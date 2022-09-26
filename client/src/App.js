import React from "react";
import "./App.css";
import "bootswatch/dist/sketchy/bootstrap.min.css";
import logo from "./logo_app.png";

import ApiList from "./components/apis-list";

function App() {
	return (
		<div>
			<nav className="navbar navbar-expand navbar-dark bg-dark ">
				<div className="navbar-brand ms-4">Gimme APIs</div>
				<img
					src={logo}
					alt="logo app"
					style={{ width: "4rem", height: "4rem" }}
				/>
			</nav>
			<ApiList />
		</div>
	);
}

export default App;
