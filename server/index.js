import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import fetch from "node-fetch";
import APIsDAO from "./dao/apisDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

const data = async function GetAPIs() {
	const APIsList = await fetch("https://api.publicapis.org/entries");
	const response = await APIsList.json();

	return response.entries;
};

MongoClient.connect(process.env.API_DB_URI)
	.catch((err) => {
		console.error(err.stack);
		process.exit(1);
	})
	.then(async (client) => {
		client.db(process.env.API_NS).collection("apis").drop();
		client
			.db(process.env.API_NS)
			.collection("apis")
			.insertMany(await data());

		await APIsDAO.injectDB(client);
		app.listen(port, () => {
			console.log(`listening on port ${port}`);
		});
	});
