import axios from "axios";

export default axios.create({
	baseURL: "http://localhost:9000/apis",
	headers: {
		"Content-type": "application/json",
	},
});
