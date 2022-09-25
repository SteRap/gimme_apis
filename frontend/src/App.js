import React from "react";
import "./App.css";
import "bootswatch/dist/sketchy/bootstrap.min.css";

import ApiList from "./components/apis-list";

function App() {
	return (
		<div>
			<nav className="navbar navbar-expand navbar-dark bg-dark ">
				<div className="navbar-brand" style={{ marginLeft: "1.5rem" }}>
					Gimme APIs
				</div>
			</nav>
			<ApiList />
		</div>
	);
}

export default App;
